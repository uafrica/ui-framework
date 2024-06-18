import { ReactNode } from "react";

export interface IMessageProps {
  heading?: string;
  children: ReactNode;
  noPadding?: boolean;
  showShadow?: boolean;
  showCloseButton?: boolean;
}

export interface IInstructionProps {
  isCenter?: boolean;
  className?: string;
  noPadding?: boolean;
  children: ReactNode;
}
