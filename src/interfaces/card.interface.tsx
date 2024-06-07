import { ReactNode } from "react";

export interface ICard {
    children: ReactNode;
    className?: string;
    width?: string;
    mediumWidth?: string;
    padding?: string;
  }