import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface ISectionHeading {
  children: ReactNode;
  icon?: IconProp;
  iconColor?: string;
  editIconClassName?: string;
  toggleEditMode?: () => void;
  hideEditMode?: boolean;
  isCenter?: boolean;
  marginTop?: boolean; // Used if two sections are below each other
  noMarginBottom?: boolean;
  options?: ReactNode;
}
