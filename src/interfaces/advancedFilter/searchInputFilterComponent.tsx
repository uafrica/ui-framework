import { ReactNode } from "react";
import { IInput } from "../input.interface";

export interface ISearchInputFilterComponent {
  type: "search";
  label?: ReactNode;
  filterProperty: string;
  inputProps?: IInput;
  shouldShow?: boolean;
}
