import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";


const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    name: { label: "User Name" },
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials: any) {
    const { name, email, password, isLogin } = credentials;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (isLogin === "false" && !user) {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.user.create({
        data: { name, email, password: hashedPassword },
      });

      if (result) return result;
      return null;
    } else if (user && (await bcrypt.compare(password, user.password))) {
      // Verify password using bcrypt
      return user;
    } else {
      return null;
    }
  },
});
const config = {
  providers: [Google, credentialsConfig],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
