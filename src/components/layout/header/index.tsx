"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import CurrentPath from "./current-path";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (pathname === "/login") return null;
  if (!isMounted) return null; // Prevent SSR mismatch

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className={cn("fixed inset-x-0 top-0 bg-white shadow-sm z-50", className)}>
      <div className="flex items-center justify-between dark:bg-gray-950/90 ">
        <Link href="/landing" className="relative h-20 w-20" prefetch={false}>
          <Image
            src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1446816802/mzzqlne1z4j96bodj1d8.png"
            alt="Logo"
            className="object-cover"
            fill
          />
        </Link>
        <CurrentPath />
        <Button
          variant="base"
          size="base"
          className="p-2 text-blue-500 [&_svg]:size-auto"
          onClick={toggleSidebar}
        >
          <UserIcon className="size-full" />
        </Button>
      </div>

      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-[100] flex flex-col p-6 overflow-y-auto shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Image
                src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1446816802/mzzqlne1z4j96bodj1d8.png"
                alt="Profile Avatar"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="mt-2">
                <h3 className="text-lg font-semibold">test</h3>
                <p className="text-sm text-gray-500">test@gmail.com</p>
                <p className="text-sm text-gray-500">testing this profile</p>
              </div>
            </div>
            <button className="text-red-500 font-bold" onClick={closeSidebar}>
              Cancel
            </button>
          </div>

          {/* Sidebar Menu */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center text-blue-600 hover:underline text-base"
            >
              <i className="bx bx-log-out mr-2 "></i> Logout
            </button>
            <button className="flex items-center text-gray-700 hover:underline text-base">
              <i className="bx bx-cog mr-2"></i> Settings
            </button>
            <button className="flex items-center text-gray-700 hover:underline text-base">
              <i className="bx bx-help-circle mr-2"></i> Help
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
