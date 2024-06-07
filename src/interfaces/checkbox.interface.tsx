import { Key, MouseEventHandler, ReactNode } from "react";

export interface ICheckbox {
  key?: Key;
  fieldId?: string;
  onClick?: MouseEventHandler | (() => void) | Function;
  label?: ReactNode;
  labelClassName?: string;
  htmlFor?: string;
  hoverTitle?: string;
  info?: ReactNode;
  className?: string;
  id?: string;
  isChecked?: boolean;
  isCenter?: boolean;
  isDisabled?: boolean;
  noPadding?: boolean;
  labelLeft?: boolean;
  labelRight?: boolean;
  textColor?: string;
  dataTest?: string;
}
