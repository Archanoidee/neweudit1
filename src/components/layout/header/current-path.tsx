"use client";

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
    <div
      className={cn(
        "border-primary-blue text-primary-blue inline-flex items-center rounded-b-sm border-b-4 px-1 text-xl font-semibold",
        className
      )}
    >
      {getPageTitle()}
    </div>
  );
};

export default CurrentPath;
