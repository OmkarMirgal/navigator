import { removeFavouriteFacility } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { FavouriteRequest, APIResponse } from "@/types/req-res-types";

export async function POST(req: NextRequest) {
  try {
    const { id, userId, category }: FavouriteRequest = await req.json();
    const details = await removeFavouriteFacility(id, userId, category);
    if (
      details &&
      typeof details !== "boolean" &&
      (details as APIResponse).msg
    ) {
      return NextResponse.json(
        { error: (details as APIResponse).msg },
        { status: (details as APIResponse).status }
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
