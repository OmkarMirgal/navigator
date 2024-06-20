"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { UserUpdatePasswordSchema, UserUpdateSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getZodError, updateUserDetails } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Check if the request has the fields currentPassword and newPassword
    if ("currentPassword" in body && "newPassword" in body) {
      const { name, email, currentPassword, newPassword } = body as z.infer<
        typeof UserUpdatePasswordSchema
      >;

      const validatedFields = UserUpdatePasswordSchema.safeParse({
        name,
        email,
        currentPassword,
        newPassword,
      });
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      if (!validatedFields.success) {
        return NextResponse.json(
          {
            error: "Invalid fields!",
            fieldError: getZodError(validatedFields.error),
          },
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
          { error: "User does not exist!" },
          { status: 404 }
        );
      }

      const currentPasswordCheck = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );

      if (!currentPasswordCheck) {
        return NextResponse.json(
          { error: "Wrong current password!" },
          { status: 401 }
        );
      }

      const user = await updateUserDetails(existingUser.id, {
        name,
        email,
        password: newHashedPassword,
      });

      if (!user) {
        return NextResponse.json(
          { success: "User Updation Failed!" },
          { status: 500 }
        );
      }
    } else {
      const { name, email } = body as z.infer<typeof UserUpdateSchema>;

      const validatedFields = UserUpdateSchema.safeParse({
        name,
        email,
      });

      if (!validatedFields.success) {
        return NextResponse.json(
          {
            error: "Invalid fields!",
            fieldError: getZodError(validatedFields.error),
          },
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
          { error: "User does not exist!" },
          { status: 404 }
        );
      }

      const user = await updateUserDetails(existingUser.id, {
        name,
        email,
      });

      if (!user) {
        return NextResponse.json(
          { success: "User Updation Failed!" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: "User updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
