import { ReactNode } from "react";

export interface IDateFilterComponent {
  type: "date";
  label?: ReactNode;
  filterProperty: string;
  dateFormat?: string;
  shouldShow?: boolean;
}
