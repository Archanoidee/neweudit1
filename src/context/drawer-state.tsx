"use client";

import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { store } from "./store";
import { iSheetState } from "@/types";
import SidebarCompenent from "@/components/layout/header/sidebar-comp";
import AddProjectDrawer from "@/components/project/add-drawer";
import AddProjectAddress from '@/components/project/details/general/add-addresses-drawer'
const RenderDrawer = () => {
  const { sheetState } = useSnapshot(store);
  return useMemo(() => {
    switch (sheetState) {
      case "add-staff":
        return <div>add staff</div>;
      case "add-project":
        return <AddProjectDrawer />;
      case "profile":
        return <SidebarCompenent />;
        case "add-project-address":
        return <AddProjectAddress />;
      default:
        return null;
    }
  }, [sheetState]);
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
