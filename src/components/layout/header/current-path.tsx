"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const CurrentPath = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const getPageTitle = () => {
    if (pathname === "/landing") return "Home";
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const limitedSegments = segments.slice(0, 2);
    // Check if the second word exists and its length exceeds 10
    if (limitedSegments[1] && limitedSegments[1].length > 10) {
      limitedSegments[1] = "Details";
    }
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
