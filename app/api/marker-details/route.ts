import { getCategoryDetails } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { PopupPoint } from "@/types/point-types";
import { error } from "console";

export async function POST(req: NextRequest) {
  try {
    const { x, y, category }: PopupPoint = await req.json();
    const param = {
      x,
      y,
      category,
    };
    const details = await getCategoryDetails(param);
    if (details === null) {
      return NextResponse.json(
        { error: "facility coords not found in db" },
        { status: 404 }
      );
    }
    return NextResponse.json(details);
  } catch (error) {
    console.error("Error fetching category details:", error);
    return NextResponse.json(
      { error: "Error fetching category details" },
      { status: 500 }
    );
  }
}
