"use client";

import GlobalDrawer from "@/components/common/drawer";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GlobalDrawer />
    </>
  );
}

export default Providers;
