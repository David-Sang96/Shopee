"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { signIn } from "@/server/auth";
import { users } from "@/server/schema";
import { loginSchema } from "@/types/authSchema";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import {
  generateEmailVerificationToken,
  sendEmail,
} from "../confirm-email/actions";

export const loginUser = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      // check user is existed
      const isUserExisted = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (isUserExisted?.email !== email)
        return { error: "Please provide valid credentials" };

      // check email is verified
      if (!isUserExisted.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          isUserExisted.email
        );
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          isUserExisted.name!.slice(0.5)
        );
        return { success: "Please verify your email" };
      }

      await signIn("credentials", { email, password, redirectTo: "/" });

      return { success: "Logged in successfully" };
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.type) {
          case "CredentialsSignin":
            return { error: "Please provide valid credentials" };
          case "OAuthSignInError":
            return { error: err.message };
        }
      }
      throw err;
    }
  });
