import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface IBanner {
  backgroundColorClass: string;
  textColorClass?: string;
  icon?: IconProp;
  children: ReactNode;
  iconClassName?: string;
}
