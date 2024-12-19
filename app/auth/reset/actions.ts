"use server";

import ResetPasswordEmailTemplate from "@/components/ResetPasswordEmailTemplate";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { passwordResetToken, users } from "@/server/schema";
import { resetPasswordSchema } from "@/types/authSchema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const currentBaseUrl = getBaseUrl();
const resend = new Resend(process.env.RESEND_API_KEY);

// Reset password TOKEN generate
const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  const isTokenExisted = await db.query.passwordResetToken.findFirst({
    where: eq(passwordResetToken.email, email),
  });

  if (isTokenExisted)
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, isTokenExisted.id));

  return await db
    .insert(passwordResetToken)
    .values({ email, token, expires })
    .returning();
};

// Send Email
export const sendPasswordResetEmail = async (
  email: string,
  expireToken: string,
  username: string,
  updatedDate: Date
) => {
  const resetPasswordLink = `${currentBaseUrl}/auth/change-password?token=${expireToken}`;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset the password for your SnapShop account",
    react: ResetPasswordEmailTemplate({
      username,
      updatedDate,
      resetPasswordLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};

// Reset password
export const resetPassword = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const isUserExisted = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!isUserExisted) return { error: "Email not found" };

    const resetPasswordToken = await generatePasswordResetToken(
      isUserExisted.email
    );
    if (!resetPasswordToken)
      return { error: "Failed to generate password reset token" };

    await sendPasswordResetEmail(
      resetPasswordToken[0].email,
      resetPasswordToken[0].token,
      isUserExisted.name,
      new Date()
    );

    return { success: "Password reset link sent" };
  });
