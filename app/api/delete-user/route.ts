import { logout } from "@/lib/auth";
import { softDeleteUser } from "@/lib/utils";
import { APIResponse } from "@/types/req-res-types";
import { NextRequest, NextResponse } from "next/server";

interface IUserDelete {
  id: number;
}

export async function POST(req: NextRequest) {
  try {
    const { id }: IUserDelete = await req.json();
    const result: APIResponse = await softDeleteUser(id);

    if (result.status === 200 && req.cookies.get("session")) {
      await logout();
    }

    return NextResponse.json(
      { msg: result.msg, status: result.status } as APIResponse,
      { status: result.status }
    );
  } catch (error) {
    console.error("Error favouriting facility:", error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
