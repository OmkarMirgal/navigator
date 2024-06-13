import { getCategoryDetails } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { PopupPoint } from "@/types/point-types";

export async function POST(req: NextRequest) {
  const { x, y, category }: PopupPoint = await req.json();
  const param = {
    x,
    y,
    category,
  };

  try {
    const details = await getCategoryDetails(param);
    return NextResponse.json(details);
  } catch (error) {
    console.error("Error fetching category details:", error);
    return NextResponse.json(
      { error: "Error fetching category details" },
      { status: 500 }
    );
  }
}
