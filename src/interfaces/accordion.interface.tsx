import { ReactNode } from "react";

export interface IAccordion {
  className?: string;
  title: ReactNode;
  overrideOpen?: boolean;
  children: ReactNode;
  onDelete?: () => void;
  backgroundColor?: string;
  textColor?: string;
  hideCaret?: boolean;
  caretColor?: string;
  endComponent?: ReactNode;
}
