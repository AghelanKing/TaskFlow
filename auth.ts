import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "./app/lib/db";
import bcrypt from "bcryptjs";

async function getUser(email: string) {
  const results = await sql`SELECT * FROM users WHERE email = ${email}`;
  console.log(results);
  return results[0];
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parseCredential = z
          .object({
            email: z.string(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parseCredential.success) {
          const { email, password } = parseCredential.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash,
          );
          if (passwordMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
