import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface IPageHeading {
    children: ReactNode;
    id?: string;
    icon?: IconProp;
    isCenter?: boolean;
    shouldNotUppercase?: boolean;
  }