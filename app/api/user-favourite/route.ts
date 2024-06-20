import {
  getUserFavoriteFacility,
  getUserFavoriteFacilityDetails,
} from "@/lib/utils";
import { FavouriteRequest } from "@/types/req-res-types";
import { NextRequest, NextResponse } from "next/server";

interface FlaggedFavouriteRequest extends FavouriteRequest {
  flag: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { id, userId, flag, category }: FlaggedFavouriteRequest =
      await req.json();
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
