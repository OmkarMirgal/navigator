"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
// import { client, connect } from "@/lib/db_pg";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/lib/utils";

export const login = async (
  values: z.infer<typeof LoginSchema>
  //   callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  const passwordCheck = await bcrypt.compare(password, existingUser.password);

  if (!passwordCheck) {
    return { error: "Wrong password!" };
  }

  return { success: "Login successful! " };
};
