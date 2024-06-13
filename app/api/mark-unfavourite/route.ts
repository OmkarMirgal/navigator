import { removeFavouriteFacility } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { FavouriteRequest, FavouriteResponse } from "@/types/req-res-types";

export async function POST(req: NextRequest) {
  const { id, userId, category }: FavouriteRequest = await req.json();
  try {
    const details = await removeFavouriteFacility(id, userId, category);
    if (
      details &&
      typeof details !== "boolean" &&
      (details as FavouriteResponse).msg
    ) {
      return NextResponse.json(
        { error: (details as FavouriteResponse).msg },
        { status: (details as FavouriteResponse).status }
      );
    }

    return NextResponse.json(details);
  } catch (error) {
    console.error("Error unfavouriting facility:", error);
    return NextResponse.json(
      { error: "Error removing favourites " },
      { status: 500 }
    );
  }
}
