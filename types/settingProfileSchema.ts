import { z } from "zod";

export const settingProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "Username must be at least 4 characters." }),
  email: z.string().email(),
});

export const twoFactorSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
  userId: z.string(),
  email: z.string().email(),
});
