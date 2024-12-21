"use server";

import TwoFactorEmailTemplate from "@/components/TwoFactorEmailTemplate";
import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { signIn } from "@/server/auth";
import { twoFactorCode, users } from "@/server/schema";
import { loginSchema } from "@/types/authSchema";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { Resend } from "resend";
import {
  generateEmailVerificationToken,
  sendEmail,
} from "../confirm-email/actions";

const resend = new Resend(process.env.RESEND_API_KEY);

const generate2FACode = async (email: string, userId: string) => {
  try {
    const code = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    const isCodeExisted = await db.query.twoFactorCode.findFirst({
      where: eq(twoFactorCode.email, email),
    });

    if (isCodeExisted) {
      await db
        .delete(twoFactorCode)
        .where(eq(twoFactorCode.id, isCodeExisted.id));
    }

    return await db
      .insert(twoFactorCode)
      .values({ code, email, expires, userId })
      .returning();
  } catch (error) {
    return null;
  }
};

const sendTwoFactorCodeEmail = async (email: string, code: string) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Shopee Two-Factor Authentication Code",
    react: TwoFactorEmailTemplate({
      code,
    }),
  });

  if (error) {
    console.log(error);
  }
};

export const loginUser = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      // check user is existed
      const isUserExisted = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!isUserExisted) return { error: "Please provide valid credentials" };

      const isPasswordMatch = await bcrypt.compare(
        password,
        isUserExisted.password as string
      );
      if (!isPasswordMatch)
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

      // handleTwoFactorAuthentication
      if (isUserExisted.isTwoFactorEnabled) {
        if (code) {
          const isValidCode = await db.query.twoFactorCode.findFirst({
            where: eq(twoFactorCode.code, code),
          });
          if (!isValidCode) return { twoFactorFail: "Invalid code" };

          if (code !== isValidCode.code)
            return { twoFactorFail: "Invalid Code" };

          const isCodeExpired = new Date() > new Date(isValidCode.expires);
          if (isCodeExpired) return { twoFactorFail: "Expired code" };

          await db
            .delete(twoFactorCode)
            .where(eq(twoFactorCode.id, isValidCode.id));
        } else {
          const twoFACode = await generate2FACode(
            isUserExisted.email,
            isUserExisted.id
          );
          if (!twoFACode)
            return { twoFactorFail: "Failed to generate 2FA code" };

          await sendTwoFactorCodeEmail(twoFACode[0].email, twoFACode[0].code);
          return {
            twoFactor: "Two Factor code sent",
          };
        }
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
