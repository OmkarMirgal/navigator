-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jugendberufshilfen" (
    "objectid" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    "traeger" TEXT,
    "leistungen" TEXT,
    "bezeichnung" TEXT,
    "kurzbezeichnung" TEXT,
    "strasse" TEXT,
    "plz" TEXT,
    "ort" TEXT,
    "telefon" TEXT,
    "email" TEXT,
    "fax" TEXT,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,
    "table_created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jugendberufshilfen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kindertageseinrichtungen" (
    "objectid" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    "traeger" TEXT,
    "bezeichnung" TEXT,
    "kurzbezeichnung" TEXT,
    "strasse" TEXT,
    "strschl" TEXT,
    "hausbez" TEXT,
    "plz" TEXT,
    "ort" TEXT,
    "hort" TEXT,
    "kita" TEXT,
    "url" TEXT,
    "telefon" TEXT,
    "fax" TEXT,
    "email" TEXT,
    "barrierefrei" TEXT,
    "integrativ" TEXT,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,
    "table_created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kindertageseinrichtungen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schulen" (
    "objectid" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    "typ" INTEGER NOT NULL,
    "art" TEXT,
    "standorttyp" TEXT,
    "bezeichnung" TEXT,
    "bezeichnungzusatz" TEXT,
    "kurzbezeichnung" TEXT,
    "strasse" TEXT,
    "plz" TEXT,
    "ort" TEXT,
    "telefon" TEXT,
    "fax" TEXT,
    "email" TEXT,
    "profile" TEXT,
    "sprachen" TEXT,
    "www" TEXT,
    "traeger" TEXT,
    "traegertyp" INTEGER NOT NULL,
    "bezugnr" TEXT,
    "gebietsartnummer" INTEGER NOT NULL,
    "snummer" INTEGER NOT NULL,
    "nummer" INTEGER NOT NULL,
    "globalid" UUID NOT NULL,
    "creationdate" TIMESTAMPTZ(6) NOT NULL,
    "creator" TEXT,
    "editdate" TIMESTAMPTZ(6) NOT NULL,
    "editor" TEXT,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,
    "table_created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schulen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schulsozialarbeit" (
    "objectid" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    "traeger" TEXT,
    "leistungen" TEXT,
    "bezeichnung" TEXT,
    "kurzbezeichnung" TEXT,
    "strasse" TEXT,
    "plz" TEXT,
    "ort" TEXT,
    "telefon" TEXT,
    "email" TEXT,
    "fax" TEXT,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,
    "table_created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schulsozialarbeit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
