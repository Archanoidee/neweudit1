"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="shadow-md p-4 bg-white dark:bg-gray-900   ">
      <Link href="/" className="text-lg font-bold text-primary">
        MyProject
      </Link>
      <Tabs defaultValue={pathname} className="mt-4">
        <TabsList className="ml-14">
          <TabsTrigger value="/project" asChild>
            <Link href="/project" className={cn("text-sm font-medium", pathname === "/project" ? "text-primary" : "text-gray-600 hover:text-primary")}>Project</Link>
          </TabsTrigger>
          <TabsTrigger value="/milestone" asChild>
            <Link href="/milestone" className={cn("text-sm font-medium", pathname === "/milestone" ? "text-primary" : "text-gray-600 hover:text-primary")}>Milestone</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NavBar;
