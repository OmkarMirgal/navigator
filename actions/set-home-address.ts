"use server";

import { insertUserHomeAddress } from "@/lib/utils";

export const setUserHomeAddress = async (
  userId: number,
  values: { address: string; latitude: number; longitude: number }
) => {
  const userHomeAddress = await insertUserHomeAddress(userId, values);

  if (userHomeAddress) {
    return { success: "User Address Updated" };
  } else {
    return { error: "Failed to update address" };
  }
};
