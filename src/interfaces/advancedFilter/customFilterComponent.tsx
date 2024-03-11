import { ReactNode } from "react";
import { IFilter } from "./filter.interface";

export interface ICustomFilterComponent {
  type: "custom";
  filterProperties: string[];
  component: (currentFilters: IFilter) => ReactNode;
  shouldShow?: boolean;
}
