import { ReactNode } from "react";

export interface ISwitch {
  isChecked: boolean;
  isDisabled?: boolean;
  isDoublePositive?: boolean;
  onChange: () => void;
  label?: ReactNode;
  info?: ReactNode;
  containerClassName?: string;
}
