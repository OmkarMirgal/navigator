import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import * as z from "zod";
import { db } from "./db";
import axios, { AxiosResponse } from "axios";

import { Points, Point, PopupPoint } from "@/types/point-types";
import { FavouriteRequest, FavouriteResponse } from "@/types/req-res-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Axios Wrapper
export const axiosApiCall = async (
  method: string,
  uri: string,
  data: any = null
): Promise<any> => {
  const methodsAllowed = ["get", "post", "put", "delete"];

  if (!methodsAllowed.includes(method.toLowerCase())) {
    console.error(`Invalid HTTP method: ${method}`);
    return null;
  }

  try {
    const baseURL = "http://localhost:3000/";

    const response: AxiosResponse = await (axios as any)[method.toLowerCase()](
      baseURL + uri,
      data,
      {
        validateStatus: () => true,
      }
    );

    return response;
  } catch (error) {
    console.error("Axios request failed:", error);
    return null;
  }
};

// Zod Error Wrapper
export const getZodError = async (error: z.ZodError) => {
  return {
    fieldName: error.errors[0]?.path.toLocaleString(),
    code: error.errors[0]?.code,
    message: error.errors[0]?.message,
  };
};

// User Logic
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = await db.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });
  return user;
};

export const getUserById = async (id: number) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const updateUserDetails = async (id: number, data: any) => {
  try {
    const updatedUser = await db.user.update({
      where: { id }, // Find user by ID
      data, // Update the specified fields
    });
    return updatedUser;
  } catch (error) {
    return null;
  }
};

// Home Address Logic
export const checkHomeCoordsExists = async (lat: number, long: number) => {
  try {
    let existingHomeAddress = await db.homeAddress.findFirst({
      where: {
        latitude: lat,
        longitude: long,
      },
      select: {
        id: true,
      },
    });
    if (!existingHomeAddress) {
      return false;
    }
    return existingHomeAddress;
  } catch (error) {
    console.error("Error checking home coordinates:", error);
    return null;
  }
};

export const insertUserHomeAddress = async (
  userId: number,
  data: { address: string; latitude: number; longitude: number }
) => {
  try {
    const coordsExists = await checkHomeCoordsExists(
      data.latitude,
      data.longitude
    );

    if (coordsExists) {
      const updatedAddress = await db.homeAddress.update({
        where: {
          id: coordsExists.id,
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      const updatedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          homeAddressId: coordsExists.id,
        },
      });

      return { updatedAddress, updatedUser };
    } else {
      const newHomeAddress = await db.homeAddress.create({
        data: {
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      const updatedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          homeAddressId: newHomeAddress.id,
        },
      });

      return { newHomeAddress, updatedUser };
    }
  } catch (error) {
    console.error("Error inserting or updating user home address:", error);
    return null;
  }
};

export const getUserAddress = async (userId: number) => {
  try {
    let userAddress = await db.homeAddress.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        address: true,
        latitude: true,
        longitude: true,
      },
    });
    if (!userAddress) {
      return null;
    }
    return userAddress;
  } catch (error) {
    console.error("Error fetching home details:", error);
  }
};

// ################### Map Utils ###################

// const categoryColor: { [key: string]: string } = {
//   schulsozialarbeit: "#a33bc6",
//   schulen: "#198000",
//   kindertageseinrichtungen: "#ea6251",
//   jugendberufshilfen: "blue",
// };

const categoryColor: { [key: string]: string } = {
  schulsozialarbeit: "#ff00ff", // Fluorescent pink
  schulen: "#00ff00", // Fluorescent green
  kindertageseinrichtungen: "#ff6600", // Fluorescent orange
  jugendberufshilfen: "#00ffff", // Fluorescent cyan
};

// Cordinates Logic
export const getSchulSocialArbeitPoints = async (): Promise<Point[]> => {
  try {
    const schulsocialarbeitCoordinates = await db.schulsozialarbeit.findMany({
      select: {
        x: true,
        y: true,
      },
    });
    const result = {
      ...schulsocialarbeitCoordinates.map((coord) => ({
        ...coord,
        category: "schulsozialarbeit",
        color: categoryColor.schulsozialarbeit,
      })),
    };
    return result;
  } catch (error) {
    console.error("Error fetching schulsocialarbeitCoordinates points:", error);
    throw error;
  }
};

export const getSchulenPoints = async (): Promise<Point[]> => {
  try {
    const schulenCoordinates = await db.schulen.findMany({
      select: {
        x: true,
        y: true,
      },
    });

    const result = {
      ...schulenCoordinates.map((coord) => ({
        ...coord,
        category: "schulen",
        color: categoryColor.schulen,
      })),
    };
    return result;
  } catch (error) {
    console.error("Error fetching schulenCoordinates points:", error);
    throw error;
  }
};

export const getKindertageseinrichtungenPoints = async (): Promise<Point[]> => {
  try {
    const kindertageseinrichtungenCoordinates =
      await db.kindertageseinrichtungen.findMany({
        select: {
          x: true,
          y: true,
        },
      });

    const result = {
      ...kindertageseinrichtungenCoordinates.map((coord) => ({
        ...coord,
        category: "kindertageseinrichtungen",
        color: categoryColor.kindertageseinrichtungen,
      })),
    };
    return result;
  } catch (error) {
    console.error(
      "Error fetching kindertageseinrichtungenCoordinates points:",
      error
    );
    throw error;
  }
};

export const getJugendberufshilfenPoints = async (): Promise<Point[]> => {
  try {
    const jugendberufshilfenCoordinates = await db.jugendberufshilfen.findMany({
      select: {
        x: true,
        y: true,
      },
    });

    const result = {
      ...jugendberufshilfenCoordinates.map((coord) => ({
        ...coord,
        category: "jugendberufshilfen",
        color: categoryColor.jugendberufshilfen,
      })),
    };

    return result;
  } catch (error) {
    console.error(
      "Error fetching jugendberufshilfenCoordinates points:",
      error
    );
    throw error;
  }
};

export const getAllPoints = async (): Promise<Points> => {
  try {
    const schulsocialarbeitCoordinates = await getSchulSocialArbeitPoints();
    const schulenCoordinates = await getSchulenPoints();

    const kindertageseinrichtungenCoordinates =
      await getKindertageseinrichtungenPoints();

    const jugendberufshilfenCoordinates = await getJugendberufshilfenPoints();

    const allCoordinates = {
      schulsocialarbeitCoordinates,
      schulenCoordinates,
      kindertageseinrichtungenCoordinates,
      jugendberufshilfenCoordinates,
    };

    return allCoordinates;
  } catch (error) {
    console.error("Error fetching all points:", error);
    throw error;
  }
};

// Category Logic
export const getSchulenDetails = async (x: string, y: string) => {
  try {
    const details = await db.schulen.findFirst({
      where: {
        x: x,
        y: y,
      },
      select: {
        id: true,
        kurzbezeichnung: true,
        art: true,
        strasse: true,
        plz: true,
        ort: true,
        telefon: true,
        fax: true,
        email: true,
        www: true,
        creator: true,
        creationdate: true,
        editor: true,
        editdate: true,
      },
    });

    return details;
  } catch (error) {
    console.error("Error fetching SchulenDetails:", error);
    throw error;
  }
};

export const getSchulsozialarbeitDetails = async (x: string, y: string) => {
  try {
    const details = await db.schulsozialarbeit.findFirst({
      where: {
        x: x,
        y: y,
      },
      select: {
        id: true,
        traeger: true,
        strasse: true,
        plz: true,
        ort: true,
        telefon: true,
        fax: true,
      },
    });

    return details;
  } catch (error) {
    console.error("Error fetching SchulsozialarbeitDetails:", error);
    throw error;
  }
};

export const getKindertageseinrichtungenDetails = async (
  x: string,
  y: string
) => {
  try {
    const details = await db.kindertageseinrichtungen.findFirst({
      where: {
        x: x,
        y: y,
      },
      select: {
        id: true,
        kurzbezeichnung: true,
        strasse: true,
        strschl: true,
        hausbez: true,
        plz: true,
        ort: true,
        url: true,
        telefon: true,
        email: true,
      },
    });

    return details;
  } catch (error) {
    console.error("Error fetching KindertageseinrichtungenDetails:", error);
    throw error;
  }
};

export const getJugendberufshilfenDetails = async (x: string, y: string) => {
  try {
    const details = await db.jugendberufshilfen.findFirst({
      where: {
        x: x,
        y: y,
      },
      select: {
        id: true,
        traeger: true,
        strasse: true,
        plz: true,
        ort: true,
        telefon: true,
        fax: true,
      },
    });

    return details;
  } catch (error) {
    console.error("Error fetching JugendberufshilfenDetails:", error);
    throw error;
  }
};

export const getCategoryDetails = async (data: PopupPoint) => {
  try {
    const category = data.category;
    let result;

    switch (category) {
      case "schulen":
        result = await getSchulenDetails(data.x, data.y);
        break;

      case "schulsozialarbeit":
        result = await getSchulsozialarbeitDetails(data.x, data.y);
        break;

      case "kindertageseinrichtungen":
        result = await getKindertageseinrichtungenDetails(data.x, data.y);
        break;

      case "jugendberufshilfen":
        result = await getJugendberufshilfenDetails(data.x, data.y);
        break;

      default:
        result = null;
        break;
    }
    return result;
  } catch (error) {
    console.error("Error fetching category details:", error);
    throw error;
  }
};

//Favourite Logic

export const checkFacility = async (
  facilityId: number,
  facilityType: string
) => {
  try {
    // Check if a record already exists for the given facilityId, facilityType
    const existingRecord = await db.favoriteFacility.findFirst({
      where: {
        facilityId: facilityId,
        facilityType: facilityType,
      },
      select: {
        id: true,
      },
    });
    if (!existingRecord) {
      return false;
    }

    return existingRecord;
  } catch (error) {
    console.error("Error checking faacility", error);
    throw error;
  }
};

export const checkFavourites = async (userId: number) => {
  try {
    // Check if a record already exists for the given userId
    const existingRecord = await db.favoriteFacility.findFirst({
      where: {
        users: { some: { id: userId } }, // Check if the user is associated with the facility
      },
      select: {
        id: true,
      },
    });
    if (!existingRecord) {
      return false;
    }

    return existingRecord;
  } catch (error) {
    console.error("Error checking favourites for user:", error);
    throw error;
  }
};

export const removeUserFavourite = async (
  previousFacilityId: number,
  userId: number
) => {
  try {
    const disconnectPreviousFavourite = await db.favoriteFacility.update({
      where: {
        id: previousFacilityId,
      },
      data: {
        // Disconnect the user from the previous facility
        users: {
          disconnect: {
            id: userId, // Specify the user ID
          },
        },
      },
    });
    if (!disconnectPreviousFavourite) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error removing favourite", error);
    throw error;
  }
};

export const updateUserFavourite = async (
  existingId: number,
  userId: number
) => {
  try {
    const updatedFavoriteFacility = await db.favoriteFacility.update({
      where: {
        id: existingId,
      },
      data: {
        // Connect the user to the existing facility
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (!updatedFavoriteFacility) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error updating favourite", error);
    throw error;
  }
};

export const createUserFavourite = async (
  userId: number,
  facilityId: number,
  facilityType: string
) => {
  try {
    const newFavoriteFacility = await db.favoriteFacility.create({
      data: {
        facilityId: facilityId,
        facilityType: facilityType,
        // Connect the user to the new favorite facility
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (!newFavoriteFacility) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error creating favourite", error);
    throw error;
  }
};

export const setAsFavouriteFacility = async (data: FavouriteRequest) => {
  const { userId, id, category } = data;

  try {
    const facilityExists = await checkFacility(id, category);
    const hasFavourite = await checkFavourites(userId);
    if (facilityExists) {
      if (hasFavourite) {
        const removeFavourite = await removeUserFavourite(
          hasFavourite.id,
          userId
        );
        if (removeFavourite) {
          const updateUser = await updateUserFavourite(
            facilityExists.id,
            userId
          );
          return updateUser;
        }
      } else {
        const updateUser = await updateUserFavourite(facilityExists.id, userId);
        return updateUser;
      }
    } else {
      if (hasFavourite) {
        const removeFavourite = await removeUserFavourite(
          hasFavourite.id,
          userId
        );
        if (removeFavourite) {
          const newFavorite = await createUserFavourite(userId, id, category);
          return newFavorite;
        }
      } else {
        const newFavorite = await createUserFavourite(userId, id, category);
        return newFavorite;
      }
    }
  } catch (error) {
    console.error("Error fetching category details:", error);
    throw error;
  }
};

export const getUserFavoriteFacility = async (userId: number) => {
  try {
    const favouriteFacility = await db.favoriteFacility.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        facilityId: true,
        facilityType: true,
      },
    });
    if (!favouriteFacility) {
      return false;
    }
    return favouriteFacility;
  } catch (error) {
    console.error("Error fetching user favourite facility:", error);
    throw error;
  }
};

export const getUserFavoriteFacilityDetails = async (
  userId: number,
  flag: boolean = false,
  facilityId?: number,
  facilityType?: string
) => {
  try {
    const favouriteFacility = await getUserFavoriteFacility(userId);
    if (!favouriteFacility) {
      if (flag) {
        return { isFavourite: false };
      }
      return null;
    }

    if (flag) {
      if (
        favouriteFacility?.facilityId === facilityId &&
        favouriteFacility?.facilityType === facilityType
      ) {
        return { isFavourite: true };
      } else {
        return { isFavourite: false };
      }
    }

    const validFacilityTypes = [
      "schulen",
      "schulsozialarbeit",
      "jugendberufshilfen",
      "kindertageseinrichtungen",
    ];

    if (!validFacilityTypes.includes(favouriteFacility?.facilityType)) {
      throw new Error(
        `Unsupported facility type: ${favouriteFacility?.facilityType}`
      );
    }

    const details = await db.$queryRawUnsafe(
      `SELECT x, y FROM ${favouriteFacility?.facilityType} WHERE id = ${favouriteFacility?.facilityId}`
    );

    return details;
  } catch (error) {
    console.error("Error fetching user favourite facility details:", error);
    throw error;
  }
};

export const removeFavouriteFacility = async (
  facilityId: number,
  userId: number,
  category: string
): Promise<FavouriteResponse | boolean> => {
  try {
    const facilityExists = await checkFacility(facilityId, category);
    const hasFavourite = await checkFavourites(userId);

    if (!facilityExists) {
      return { msg: "Facility does not exists", status: 404 };
    }

    if (!hasFavourite) {
      return { msg: "User has no favourite facility", status: 404 };
    }
    const removeFavourite = await removeUserFavourite(hasFavourite.id, userId);
    return removeFavourite;
  } catch (error) {
    console.error("Error removing favourite facility:", error);
    throw error;
  }
};
