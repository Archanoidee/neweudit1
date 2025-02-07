import { proxy } from "valtio";
import { iSheetState } from "../types";

//states
export const store = proxy({
  isSheetOpen: false,
  sheetState: "" as iSheetState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sheetData: {} as any,
});
