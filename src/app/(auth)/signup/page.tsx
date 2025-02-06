"use client";
import { startTransition, useState } from "react";
import Link from "next/link";
import FormInput from "@/components/common/Forminput";
import { Button } from "@/components/ui/shadcn/button";
import { loginSignup } from "@/actions/user";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    console.log(formData);

    setLoading(true);

    startTransition(async () => {
      const res = await loginSignup(formData, false);

      if (res?.error) {
        // Check if res is defined before accessing its error property
        toast({ title: res.error, variant: "destructive" });
      } else {
        toast({ title: "Signup successful!", variant: "destructive" });
      }
      setLoading(false);
    });
  };

  return (
    <div className="grid min-h-screen place-content-center bg-gray-100">
      <div className="flex w-[450px] flex-col items-center justify-center gap-5 rounded-lg bg-white py-10 shadow-lg">
        <h1 className="text-center text-4xl font-bold">Sign Up</h1>
        <form action={handleSubmit} className="w-full px-5">
          <FormInput
            name="name"
            type="text"
            placeholder="Enter your name"
            label="Full Name"
            required
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Enter your email"
            label="Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address."
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
            required
            minLength={8}
            title="Password must be at least 8 characters long."
          />
          <Button
            type="submit"
            className={`${
              loading ? "disable cursor-not-allowed" : ""
            } w-full bg-blue-500`}
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
        <Link
          href="/login"
          className="cursor-pointer text-center text-blue-800 underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
