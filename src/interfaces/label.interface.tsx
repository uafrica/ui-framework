import { ReactNode } from "react";

export interface ILabel {
  children?: ReactNode;
  className?: string;
  htmlFor?: string;
  noMargin?: boolean;
  labelColor?: string;
}

export interface ILabelWithValue {
  label: string;
  value: ReactNode;
  noMargin?: boolean;
  info?: ReactNode;
  labelColor?: string;
  doNotShowEnDash?: boolean;
  dataTest?: string;
}
