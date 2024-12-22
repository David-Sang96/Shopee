"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { users } from "@/server/schema";
import {
  avatarSchema,
  settingProfileSchema,
  twoFactorSchema,
} from "@/types/settingProfileSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateProfileName = actionClient
  .schema(settingProfileSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    if (!name || !email) return { error: "Invalid credential" };

    const getUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!getUser) return { error: "User not found" };

    await db.update(users).set({ name }).where(eq(users.id, getUser.id));

    revalidatePath("/dashboard/settings");
    return { success: "Name updated successfully" };
  });

export const toggleTowFactorAuth = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: { isTwoFactorEnabled, email } }) => {
    const isUserExited = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!isUserExited) return { error: "Something went wrong" };

    if (isTwoFactorEnabled === isUserExited.isTwoFactorEnabled) return null;

    await db
      .update(users)
      .set({ isTwoFactorEnabled })
      .where(eq(users.id, isUserExited.id));

    revalidatePath("/dashboard/settings");
    return { success: "2FA saved" };
  });

export const profileAvatarUpdate = actionClient
  .schema(avatarSchema)
  .action(async ({ parsedInput: { image, email } }) => {
    if (!image) return { error: "Image is required" };

    const isUserExisted = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!isUserExisted) return { error: "Something went wrong" };

    await db.update(users).set({ image }).where(eq(users.id, isUserExisted.id));

    revalidatePath("/dashboard/settings");
    return { success: "Profile image uploaded" };
  });
