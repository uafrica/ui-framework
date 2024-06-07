import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface IDropdown {
  onClick?: () => void | Function;
  containerRef?: any;
  children: ReactNode;
  title?: ReactNode;
  square?: boolean;
  icon?: IconProp;
  appendHTML?: IconProp;
  noBackground?: boolean;
  color?: string;
  id?: string;
  style?: string;
  widthClass?: string; // Tailwind w-X class e.g. w-56
  buttonWidth?: string;
  borderColor?: string;
  leftRounded?: boolean;
  rightRounded?: boolean;
  buttonStyle?: any;
  between?: boolean;
  padding?: string;
  placement?:
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
}

export interface IMenuItem {
  title: string;
  icon?: IconProp;
  appendHTML?: ReactNode;
  onClick: () => void | Function;
  id?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  closeOnClick?: boolean;
}

export interface IMenuHeading {
  title: string;
  icon?: IconProp;
  id?: string;
}

export interface IMenuItemContainer {
  children: ReactNode;
}

export interface IDropdownMenuContextType {
  isVisible: boolean;
  showDropdownMenu: () => void;
  hideDropdownMenu: () => void;
}
