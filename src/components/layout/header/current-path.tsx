"use client";

import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const CurrentPath = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const getPageTitle = () => {
    if (pathname === "/landing") return "Home";
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const limitedSegments = segments.slice(0, 2);
    return limitedSegments
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Button
      className={cn("text-xl disabled:opacity-100", className)}
      variant="ghost"
      disabled
    >
      {getPageTitle()}
    </Button>
  );
};

export default CurrentPath;
