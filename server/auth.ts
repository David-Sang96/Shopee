import { loginSchema } from "@/types/authSchema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./index";
import { users } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.AUTH_SECRET!,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // OAuthAccountNotLinked: Another account already exists with the same e-mail address (to remove this error set this true)
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedData = loginSchema.safeParse(credentials);

        if (validatedData.success) {
          const { email, password } = validatedData.data;

          const isUseExisted = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!isUseExisted || !password) return null;

          const isPasswordMatch = await bcrypt.compare(
            password,
            isUseExisted.password
          );

          if (isPasswordMatch) return isUseExisted;
        }
        return null;
      },
    }),
  ],
});
