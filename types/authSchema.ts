import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .trim()
    .min(5, { message: "Password must be at least 5 characters." }),
  code: z.string().optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: "Username must be at least 4 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .trim()
    .min(5, { message: "Password must be at least 5 characters." }),
});
