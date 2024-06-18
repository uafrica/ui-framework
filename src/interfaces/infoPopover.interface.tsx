import { ReactNode } from "react";

export interface IInfoPopover {
  placement?:
    | "auto"
    | "bottom-start"
    | "bottom-end"
    | "top-start"
    | "top-end"
    | "top"
    | "bottom"
    | "left"
    | "right";
  children: ReactNode;
  popoverContent: ReactNode;
  showPopover: boolean;
  onPopoverDismiss: () => void;
  width?: string;
  dataTest?: string;
}
