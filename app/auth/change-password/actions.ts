"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { passwordResetToken, users } from "@/server/schema";
import { changePasswordSchema } from "@/types/authSchema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const dbPool = drizzle(pool);

export const changePassword = actionClient
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    if (!token) return { error: "Missing token" };

    const isTokenExisted = await db.query.passwordResetToken.findFirst({
      where: eq(passwordResetToken.token, token),
    });
    if (!isTokenExisted) return { error: "Invalid Token" };

    const isTokenExpired = new Date() > new Date(isTokenExisted.expires);
    if (isTokenExpired) return { error: "Token expired.Please try again" };

    const isUserExisted = await db.query.users.findFirst({
      where: eq(users.email, isTokenExisted.email),
    });
    if (!isUserExisted) return { error: "User not found" };

    const hashPassword = await bcrypt.hash(password, 10);

    await dbPool.transaction(async (context) => {
      await context
        .update(users)
        .set({ password: hashPassword })
        .where(eq(users.id, isUserExisted.id));

      await context
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.id, isTokenExisted.id));
    });
    // await db
    //   .update(users)
    //   .set({ password: hashPassword })
    //   .where(eq(users.id, isUserExisted.id));

    // await db
    //   .delete(passwordResetToken)
    //   .where(eq(passwordResetToken.id, isTokenExisted.id));

    return { success: "Password updated successfully" };
  });
