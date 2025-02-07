"use client";

import { handleSheetClose } from "@/context/drawer-state";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SidebarCompenent = () => {
  const router = useRouter();
  return (
    <div className="flex h-full w-full max-w-md flex-col bg-white">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Image
            src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1446816802/mzzqlne1z4j96bodj1d8.png"
            alt="Profile Avatar"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="mt-2">
            <h3 className="text-lg font-semibold">test</h3>
            <p className="text-sm text-gray-500">test@gmail.com</p>
            <p className="text-sm text-gray-500">testing this profile</p>
          </div>
        </div>
        <button className="font-bold text-red-500" onClick={handleSheetClose}>
          Cancel
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => router.push("/login")}
          className="flex items-center text-base text-blue-600 hover:underline"
        >
          <i className="bx bx-log-out mr-2"></i> Logout
        </button>
        <button className="flex items-center text-base text-gray-700 hover:underline">
          <i className="bx bx-cog mr-2"></i> Settings
        </button>
        <button className="flex items-center text-base text-gray-700 hover:underline">
          <i className="bx bx-help-circle mr-2"></i> Help
        </button>
      </div>
    </div>
  );
};

export default SidebarCompenent;
