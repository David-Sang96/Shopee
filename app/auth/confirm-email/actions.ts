"use server";

import VerificationEmailTemplate from "@/components/VerificationEmailTemplate";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { db } from "@/server";
import { emailVerificationToken, users } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const currentBaseUrl = getBaseUrl();
const resend = new Resend(process.env.RESEND_API_KEY);

// Verification TOKEN generate
export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 15 * 60 * 1000);
  const isTokenExisted = await db.query.emailVerificationToken.findFirst({
    where: eq(emailVerificationToken.email, email),
  });
  if (isTokenExisted) {
    await db
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken.id, isTokenExisted.id));
  }
  const generateNewVerificationToken = await db
    .insert(emailVerificationToken)
    .values({ email, token, expires })
    .returning();
  return generateNewVerificationToken;
};

// Send Email
export const sendEmail = async (
  email: string,
  expireToken: string,
  userFirstName: string
) => {
  const verifyEmailLink = `${currentBaseUrl}/auth/confirm-email?token=${expireToken}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account - Welcome to Shopee",
    react: VerificationEmailTemplate({
      userFirstName,
      verifyEmailLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};

// Email Confirm with token
export const emailConfirmation = async (verificationToken: string) => {
  if (!verificationToken) return { error: "Missing token" };

  const isTokenExisted = await db.query.emailVerificationToken.findFirst({
    where: eq(emailVerificationToken.token, verificationToken),
  });
  if (!isTokenExisted) return { error: "Invalid token" };

  const isTokenExpired = new Date() > new Date(isTokenExisted.expires);
  if (isTokenExpired) return { error: "Token expired" };

  const isUserExisted = await db.query.users.findFirst({
    where: eq(users.email, isTokenExisted.email),
  });
  if (!isUserExisted) return { error: "User not found" };

  await db
    .update(users)
    .set({ emailVerified: new Date(), email: isTokenExisted.email })
    .where(eq(users.id, isUserExisted.id));

  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.id, isTokenExisted.id));

  return { success: "Email verified" };
};
