import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler, ReactNode } from "react";

export interface IButtonProps {
  id?: string;
  title?: ReactNode;
  loadingTitle?: ReactNode;
  isLoading?: boolean;
  icon?: IconProp;
  iconSize?: SizeProp;
  tabIndex?: number | undefined;
  onClick?: MouseEventHandler | (() => void) | Function;
  isCenter?: boolean;
  className?: string;
  isDisabled?: boolean;
  hoverTitle?: string;
  leftRounded?: boolean;
  rightRounded?: boolean;
  bgColor?: string; // Overrides icon bg
  iconClassName?: string;
}

export interface ILinkProps {
  id?: string;
  title?: ReactNode;
  small?: boolean;
  icon?: IconProp;
  color?: string;
  onClick?: MouseEventHandler | (() => void) | Function;
  isCenter?: boolean;
  className?: string;
  isDisabled?: boolean;
  loadingTitle?: string;
  hoverTitle?: string;
  isLoading?: boolean;
  to?: string;
  target?: string;
  noPadding?: boolean;
  tabIndex?: number | undefined;
  iconClassName?: string;
}

export interface ILinkBaseProps extends ILinkProps {
  color: string;
}

export interface IButtonsPanelProps {
  children: ReactNode;
  isCenter?: boolean;
  isLeft?: boolean;
  noMargin?: boolean;
}

export interface IButtonBaseProps extends IButtonProps {
  buttonTypeClassNames: string;
  iconSize?: SizeProp;
  type?: "button" | "submit" | "reset" | undefined;
  color?: string;
}
