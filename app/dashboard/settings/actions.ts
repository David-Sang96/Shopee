"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { users } from "@/server/schema";
import { settingProfileSchema } from "@/types/settingProfileSchema";
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
