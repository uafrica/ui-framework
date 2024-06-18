import { ReactNode } from "react";

export interface ICounter {
  label?: ReactNode;
  isLabelInline?: boolean;
  labelClassName?: string;
  value?: number;
  onChange?: (number: number) => void;
  step?: number;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  placeholder?: string;
  id?: string;
  shouldAutoFocus?: any;
  inputID?: string;
  containerClassName?: string;
  htmlFor?: string;
  shouldOverlapLabel?: boolean;
}
