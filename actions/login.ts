"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (
  values: z.infer<typeof LoginSchema>
  //   callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  console.log(email, password);

  // try {
  //   await signIn("credentials", {
  //     email,
  //     password,
  //     redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  //   })
  // } catch (error) {

  //     return { error: "Invalid credentials!" }
  //   }
};
