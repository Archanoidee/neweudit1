"use client";

import { store } from "@/context/store";
import { useSnapshot } from "valtio";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";
import RenderDrawer, { handleSheetClose } from "@/context/drawer-state";
import VisuallyHidden from "@/components/ui/visually-hidden";

const GlobalDrawer = () => {
  const snap = useSnapshot(store);
  return (
    <Sheet open={snap.isSheetOpen} onOpenChange={handleSheetClose}>
      <SheetContent
        side={snap?.sheetData?.side || "right"}
        className="min-w-full max-w-fit overflow-y-auto sm:w-full sm:min-w-fit"
      >
        <VisuallyHidden>
          <SheetTitle>{snap.sheetState}</SheetTitle>
          <SheetDescription>{snap?.sheetData?.title}</SheetDescription>
        </VisuallyHidden>
        <RenderDrawer />
      </SheetContent>
    </Sheet>
  );
};

export default GlobalDrawer;
