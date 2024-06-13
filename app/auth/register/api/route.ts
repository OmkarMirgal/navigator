"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas";
import { createUser, getUserByEmail } from "@/lib/utils";
import { setSession } from "@/lib/auth";

// export async function POST(req: Request) {
//   const { name, email, password } = (await req.json()) as z.infer<
//     typeof RegisterSchema
//   >;

//   const validatedFields = RegisterSchema.safeParse({ name, email, password });
//   const hashedPassword = await bcrypt.hash(password, 10);

//   if (!validatedFields.success) {
//     return NextResponse.json(
//       { error: "Invalid fields!", statusCode: 400 },
//       { status: 400 }
//     );
//   }

//   const existingUser = await getUserByEmail(email);

//   if (existingUser) {
//     return NextResponse.json(
//       { error: "Email already in use!", statusCode: 409 },
//       { status: 409 }
//     );
//   }

//   const user = await db.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return NextResponse.json(
//     { success: "User Created Successfully!", statusCode: 201 },
//     { status: 201 }
//   );
// }

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as z.infer<
      typeof RegisterSchema
    >;

    const validatedFields = RegisterSchema.safeParse({ name, email, password });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!validatedFields.success) {
      const zodError = {
        fieldName: validatedFields.error.errors[0]?.path.toLocaleString(),
        code: validatedFields.error.errors[0]?.code,
        message: validatedFields.error.errors[0]?.message,
      };
      return NextResponse.json(
        {
          error: "Invalid fields!",
          fieldError: zodError,
        },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use!" },
        { status: 409 }
      );
    }

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return NextResponse.json(
        { success: "User Creation Failed!" },
        { status: 500 }
      );
    }

    await setSession(user);

    return NextResponse.json(
      { success: "User Created Successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
