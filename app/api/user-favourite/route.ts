import {
  getUserFavoriteFacility,
  getUserFavoriteFacilityDetails,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { FavouriteRequest } from "@/types/point-types";

interface FlaggedFavouriteRequest extends FavouriteRequest {
  flag: boolean;
}

export async function POST(req: NextRequest) {
  const { id, userId, flag, category }: FlaggedFavouriteRequest =
    await req.json();
  try {
    const details = await getUserFavoriteFacilityDetails(
      userId,
      flag,
      id,
      category
    );
    return NextResponse.json(details);
  } catch (error) {
    console.error("Error favouriting facility:", error);
    return NextResponse.json(
      { error: "Error processing favourites " },
      { status: 500 }
    );
  }
}
