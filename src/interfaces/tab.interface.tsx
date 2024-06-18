import { ReactNode } from "react";

export interface ITab {
  children?: ReactNode;
  tabID: string;
  id?: string;
  title?: string;
  titleHTML?: any;
  info?: ReactNode;
  className?: string;
  isClickable?: boolean;
}

export interface ITabs {
  children: ReactNode[];
  activeTabID: string;
  onSelect: any;
  spacingClass?: string;
}

export interface IGenericTabs extends ITabs {
  isPrimary?: boolean;
}
