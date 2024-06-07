import { IconName } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface IInfoButton {
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
  className?: string;
  icon?: IconName;
}
