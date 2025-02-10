"use client";

import GlobalDrawer from "@/components/common/drawer";
import { Toaster } from "@/components/ui/shadcn/toaster";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GlobalDrawer />
      <Toaster />
    </>
  );
}

export default Providers;
