import { ReactNode } from "react";
import { ISelectBase } from "../selectBase.interface";

export interface ISelectFilterComponent {
  type: "select";
  label?: ReactNode;
  filterProperty: string;
  options: {
    [key: string]: any;
  }[];
  selectProps?: ISelectBase;
  shouldShow?: boolean;
  valueModifier?: (value: any) => any;
  onChangeModifier?: (value: any) => any;
}
