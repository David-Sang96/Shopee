"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { users } from "@/server/schema";
import { registerSchema } from "@/types/authSchema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const isUserExisted = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (isUserExisted) {
      if (!isUserExisted.emailVerified) {
        // send verification email
        return { success: "Please verify your Email." };
      }
      return { error: "Email already in-use." };
    }

    return { success: "Please verify your Email." };
  });
