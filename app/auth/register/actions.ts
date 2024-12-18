"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { users } from "@/server/schema";
import { registerSchema } from "@/types/authSchema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { generateEmailVerificationToken, sendEmail } from "../actions";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const isUserExisted = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (isUserExisted) {
      if (!isUserExisted.emailVerified) {
        // regenerate email verification token that expires in 30 mins
        const verificationToken = await generateEmailVerificationToken(email);

        // resend verification email
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          name.slice(0, 5)
        );
        return { success: "Please reverify your email" };
      }
      return { error: "Email already in-use." };
    }
    // record user
    await db.insert(users).values({ name, email, password: hashPassword });

    // generate new email verification token that expires in 30 mins
    const verificationToken = await generateEmailVerificationToken(email);

    // send verification email
    await sendEmail(
      verificationToken[0].email,
      verificationToken[0].token,
      name.slice(0, 5)
    );
    return { success: "Please verify your email" };
  });
