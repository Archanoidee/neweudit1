"use server";

import { db } from "@/lib/db";
import { signIn } from "../../auth";
import { redirect } from "next/navigation";

type SignInResponse = {
  error?: string;
  [key: string]: unknown; // To allow other potential properties
};

export const loginSignup = async (formData: FormData, isLogin: boolean) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!isLogin) {
      // Check if the user already exists during signup
      const existingUser = await db.user.findUnique({ where: { email } });
      if (existingUser) {
        return { error: "User already exists. Please login instead." };
      }

      // Create a new user in the database
      await db.user.create({ data: { name, email, password } });
      redirect("/login"); // Redirect to login page after successful signup
    }

    // Attempt to log in the user
    const res = (await signIn("credentials", {
      name,
      email,
      password,
      isLogin,
      redirect: false, // Set to false for manual redirection
    })) as SignInResponse;

    if (res?.error) {
      return { error: res.error || "Invalid credentials. Please try again." };
    }

    redirect("/main"); // Redirect to /main after successful login
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      // NEXT_REDIRECT is expected during a successful signIn
      return;
    } else if (err instanceof Error) {
      // Handle generic errors
      return { error: err.message || "Invalid credentials. Please try again." };
    }
    // Fallback for unexpected error formats
    return { error: "An unknown error occurred." };
  }
};
