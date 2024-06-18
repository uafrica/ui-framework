import { ReactNode } from "react";

export interface IRadioButton {
  label: string;
  onChange?: (value: any) => void;
  isChecked?: boolean;
  isDisabled?: boolean;
  labelClassName?: string;
  className?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  name: string;
}

export interface IRadioGroup {
  title?: ReactNode;
  options: string[];
  onChange?: any;
  isDisabled?: boolean;
  labelClassName?: string;
  className?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  name: string;
}
