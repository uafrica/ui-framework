import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler, ReactNode } from "react";

export interface ISmallMediumModalProps {
  children: ReactNode;
  onHide?: MouseEventHandler | (() => void) | (() => Promise<void>) | Function;
  title?: ReactNode;
  icon?: IconProp;
  showCloseButton: boolean;
  disableClickOutsideToClose?: boolean;
  disablePressEscToClose?: boolean;
  margin?: string;
}

export interface IBaseProps extends ISmallMediumModalProps {
  className?: string;
}
