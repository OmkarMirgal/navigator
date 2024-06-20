import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  //redirect to dashboard if session exists on /auth routes
  if (session && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //redirect to /auth/login if session does not exists on protected routes
  if (!session && request.nextUrl.pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// middleware only valid on these routes
export const config = {
  matcher: ["/dashboard", "/dashboard/user", "/auth/login", "/auth/register"],
};
