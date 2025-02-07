"use client";

import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { store } from "./store";
import { iSheetState } from "@/types";
import SidebarCompenent from "@/components/layout/header/sidebar-comp";
import AddProject from "@/components/common/drawer/add-project";

const RenderDrawer = () => {
  const { sheetState } = useSnapshot(store);

  const RenderDrawer = useMemo(() => {
    switch (sheetState) {
      case "add-staff":
        return <div>add staff</div>;
      case "add-project":
        return <AddProject/>
      case "profile":
        return <SidebarCompenent />;
      default:
        return null;
    }
  }, [sheetState]);
  return RenderDrawer;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDrawerOpen = (state: iSheetState, data?: any) => {
  store.isSheetOpen = true;
  store.sheetState = state;
  if (data !== undefined) {
    store.sheetData = data;
  }
};

export const handleDrawerClose = () => {
  store.isSheetOpen = false;
};

export default RenderDrawer;
