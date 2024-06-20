const { default: axios } = require("axios");
require("dotenv").config();
const { Client } = require("pg");
const format = require("pg-format");

const openDataApiUrls = {
  schulen:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  schulsozialarbeit:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  kindertageseinrichtungen:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  jugendberufshilfen:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
};

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString(); // Use ISO format for timestamp
}

// Function to generate CREATE TABLE SQL script
function generateCreateTableSQL(tableName, properties) {
  let sql = `CREATE TABLE ${tableName} (\n`;
  // Generate columns based on properties
  for (const [key, value] of Object.entries(properties)) {
    sql += `  ${key.toLowerCase()} ${getType(key)}${getConstraints(key)},\n`;
  }
  // Additional X, Y columns
  sql += `  X TEXT NOT NULL,\n  Y TEXT NOT NULL,\n`;
  sql += `  table_created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);`;
  return sql;
}

// Helper function to determine column type based on key
function getType(key) {
  switch (key) {
    case "ID":
    case "OBJECTID":
    case "TYP":
    case "TRAEGERTYP":
    case "GEBIETSARTNUMMER":
    case "SNUMMER":
    case "NUMMER":
      return "INT NOT NULL";
    case "CreationDate":
    case "EditDate":
      return "TIMESTAMP WITH TIME ZONE NOT NULL";
    case "GlobalID":
      return "UUID NOT NULL";
    default:
      return "TEXT";
  }
}

// Helper function to get column constraints
function getConstraints(key) {
  return key === "ID" ? " PRIMARY KEY" : ""; // Only ID is a primary key
}

// Function to generate INSERT INTO SQL script
function generateInsertSQL(tableName, features) {
  const columnsSet = new Set();
  const valuesList = [];

  features.forEach((feature) => {
    const values = [];
    for (const [key, value] of Object.entries(feature.properties)) {
      columnsSet.add(key.toLowerCase());
      let val = value;
      // Handle specific types
      switch (key) {
        case "ID":
        case "OBJECTID":
        case "TYP":
        case "TRAEGERTYP":
        case "GEBIETSARTNUMMER":
        case "SNUMMER":
        case "NUMMER":
          val = parseInt(value);
          break;
        case "CreationDate":
        case "EditDate":
          val = formatDate(value);
          break;
        default:
          val = value === null ? "" : value;
      }
      values.push(val);
    }
    // Add X, Y values
    columnsSet.add("X");
    values.push(feature.geometry.coordinates[0]);
    columnsSet.add("Y");
    values.push(feature.geometry.coordinates[1]);

    valuesList.push(values);
  });

  const columns = `(${Array.from(columnsSet).join(", ")})`;

  const sql = format(
    `INSERT INTO ${tableName} ${columns} VALUES %L`,
    valuesList
  );

  return sql;
}

// Function to execute SQL query
async function executeQuery(client, query) {
  try {
    const result = await client.query(query);
    console.log("Query executed successfully:", result);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function ApiCaller(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(`Error ar ApiCaller` + error);
  }
}

// Main function to process files
async function processFiles() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect(); // Connect to the PostgreSQL database

    for (key in openDataApiUrls) {
      let apiResult = "";
      let tableName = "";
      let properties = "";
      apiResult = await ApiCaller(openDataApiUrls[key]);
      if (
        apiResult.data.type !== "FeatureCollection" ||
        !Array.isArray(apiResult.data.features)
      ) {
        console.error(
          `Invalid GeoJSON format from API URL: ${openDataApiUrls[key]}`
        );
        continue;
      }

      tableName = key;
      properties = apiResult.data.features[0]?.properties || {};

      // Generate SQL scripts
      const createTableSQL = generateCreateTableSQL(tableName, properties);
      const insertSQL = generateInsertSQL(tableName, apiResult.data.features);

      // Drop existing table if exists
      await executeQuery(client, `DROP TABLE IF EXISTS ${tableName}`);

      // Execute SQL queries
      await executeQuery(client, createTableSQL);
      await executeQuery(client, insertSQL);

      console.log(
        `SQL scripts for ${tableName} generated successfully!\n \n -------------------------------------------------------------------- \n -------------------------------------------------------------------- \n`
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.end(); // Close the database connection
  }
}

// Start processing
processFiles();
