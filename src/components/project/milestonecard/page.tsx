"use client"; // Enables React's client-side rendering.

import React from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";
import { useRouter } from "next/navigation";

const Milestone: React.FC = () => {
  const router = useRouter();
  return (
    <div className="px-6 pb-6">
      {/* Milestone list */}
      <div className="container mx-auto grid gap-12 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="mx-auto w-[300px] h-[300px] bg-white rounded-lg shadow-lg shadow-gray-300 p-5 overflow-hidden flex-wrap min-w-[300px] min-h-[400px]">
          {/* Profile Image & Name */}
          <div className="flex items-center mt-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src=""
                alt="Milestone Avatar"
              />
              <AvatarFallback>
                MS
              </AvatarFallback>
            </Avatar>
            <div className="ml-5">
              <span className="block text-lg font-semibold text-gray-900 truncate w-[200px]">
                Milestone 
              </span>
              <span className="block text-lg font-sebold text-gray-900 truncate w-[200px]"> On hold</span>
            </div>
          </div>
          {/* Milestone Info */}
          <div className="bg-gray-100 p-3 rounded-md text-sm">
            <p className="flex items-center gap-2 text-md">
              📅 Start Date: 2025-02-06
            </p>
            <p className="flex items-center gap-2 mt-2 text-md">
              📅 End Date: 2025-12-31
            </p>
            <p className="flex items-center gap-2 mt-2 text-md">
              📝 Project Stage: Planning
            </p>
            <br />
            <br /><br />
            <br /><br />
          </div>
          {/* View Details Button */}
          <div className="mt-10 text-center">
            <Button
              className="p-0 bg-blue-600 text-white px-5 py-2 text-sm rounded-md hover:bg-blue-700"
              onClick={() => router.push("/milestone/details/1")}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Milestone;