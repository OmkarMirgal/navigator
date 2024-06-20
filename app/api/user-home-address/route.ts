import { getUserAddress } from "@/lib/utils";
import { APIResponse, HomeAdressResponse } from "@/types/req-res-types";
import { NextRequest, NextResponse } from "next/server";

interface UserAddressRequest {
  userId: number;
}
export async function POST(req: NextRequest) {
  try {
    const { userId }: UserAddressRequest = await req.json();
    const details = await getUserAddress(userId);

    if (details === null) {
      return NextResponse.json(
        { msg: "User has no home address", status: 404 } as APIResponse,
        { status: 404 }
      );
    }
    return NextResponse.json(details);
  } catch (error) {
    console.error("Error fetching home address:", error);
    return NextResponse.json(
      { error: "Error processing home address " },
      { status: 500 }
    );
  }
}
