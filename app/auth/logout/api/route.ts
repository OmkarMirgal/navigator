"use server";
import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    if (req.cookies.get("session")) {
      await logout();

      return NextResponse.json(
        { success: "Logout successful!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No Session Cookie Found!" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
