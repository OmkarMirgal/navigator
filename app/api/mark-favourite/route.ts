import { setAsFavouriteFacility } from "@/lib/utils";
import { FavouriteRequest } from "@/types/req-res-types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, category, userId }: FavouriteRequest = await req.json();
    const param = {
      category,
      id,
      userId,
    };
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
