"use client";

import FormInput from "@/components/common/Forminput";
import { Button } from "@/components/ui/shadcn/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { loginSignup } from "@/actions/user";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await loginSignup(formData, true);
      if (res?.error) {
        toast({ title: res.error, variant: "destructive" });
      } else {
        toast({ title: "Login successful", variant: "default" });
        router.push("/landing");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        {/* Image Section */}
        <div className="relative hidden w-1/2 items-center justify-center bg-gray-50 p-5 md:flex">
          <Image
            src="https://account.asus.com/img/login_img02.png"
            alt="Login illustration"
            className="h-auto max-w-full"
            fill
          />
        </div>
        {/* Form Section */}
        <div className="flex w-full flex-col items-center justify-center gap-5 px-5 py-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold md:text-4xl">Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmit(formData);
            }}
            className="w-full space-y-4"
          >
            <FormInput
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              required
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              required
            />
            <div className="mt-5">
              <Button
                type="submit"
                className={`w-full bg-blue-500 ${loading ? "disable cursor-not-allowed" : ""}`}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
