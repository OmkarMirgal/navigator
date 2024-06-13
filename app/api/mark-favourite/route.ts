import { setAsFavouriteFacility } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { FavouriteRequest } from "@/types/point-types";

export async function POST(req: NextRequest) {
  const { id, category, userId }: FavouriteRequest = await req.json();
  const param = {
    category,
    id,
    userId,
  };
  try {
    const details = await setAsFavouriteFacility(param);
    return NextResponse.json(details);
  } catch (error) {
    console.error("Error favouriting facility:", error);
    return NextResponse.json(
      { error: "Error processing favourites " },
      { status: 500 }
    );
  }
}
