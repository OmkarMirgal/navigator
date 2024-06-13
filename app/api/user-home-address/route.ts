import { getUserAddress } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface UserAddressRequest {
  userId: number;
}
export async function POST(req: NextRequest) {
  const { userId }: UserAddressRequest = await req.json();
  try {
    const details = await getUserAddress(userId);
    return NextResponse.json(details);
  } catch (error) {
    console.error("Error favouriting facility:", error);
    return NextResponse.json(
      { error: "Error processing favourites " },
      { status: 500 }
    );
  }
}
