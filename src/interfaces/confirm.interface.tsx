import { MouseEventHandler, ReactNode } from "react";

export interface IConfirm {
  isVisible?: boolean;
  isDisabled?: boolean;
  onConfirm?: MouseEventHandler;
  onCancel?: () => void;
  onClose?: () => void;
  onShow?: () => void;
  children: ReactNode;
  title: string;
  body?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: string;
  showCancelButton?: boolean;
  disableClickOutsideToClose?: boolean;
  disablePressEscToClose?: boolean;
}
