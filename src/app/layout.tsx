// app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure this is imported correctly
import { Toaster } from "@/components/ui/shadcn/toaster";
import Providers from "./providers";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App", // Set your app title here
  description: "Generated by create next app", // Set your app description here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <main className="flex flex-col">
            <Header className="px-8" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
