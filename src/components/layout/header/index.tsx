"use client";

import Link from "next/link";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import CurrentPath from "./current-path";
import { usePathname } from "next/navigation";
import { handleDrawerOpen } from "@/context/drawer-state";

const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return (
    <header
      className={cn("fixed inset-x-0 top-0 z-50 bg-white shadow-sm", className)}
    >
      <div className="flex items-center justify-between dark:bg-gray-950/90">
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
          onClick={() => handleDrawerOpen("profile")}
        >
          <UserIcon className="size-full" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
