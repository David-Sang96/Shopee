"use server";

import { actionClient } from "@/lib/safeAction";
import { loginSchema } from "@/types/authSchema";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log(email, password);
  });
