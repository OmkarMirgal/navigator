"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { LoginSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/utils";
import { setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as z.infer<
      typeof LoginSchema
    >;

    const validatedFields = LoginSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      const zodError = {
        fieldName: validatedFields.error.errors[0]?.path.toLocaleString(),
        code: validatedFields.error.errors[0]?.code,
        message: validatedFields.error.errors[0]?.message,
      };
      return NextResponse.json(
        { error: "Invalid fields!", fieldError: zodError },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);
    if (
      !existingUser ||
      !existingUser.email ||
      !existingUser.name ||
      !existingUser.id ||
      !existingUser.password
    ) {
      return NextResponse.json(
        { error: "Email does not exist!" },
        { status: 404 }
      );
    }

    const passwordCheck = await bcrypt.compare(password, existingUser.password);

    if (!passwordCheck) {
      return NextResponse.json({ error: "Wrong password!" }, { status: 401 });
    }

    await setSession(existingUser);

    return NextResponse.json({ success: "Login successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error during user login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
