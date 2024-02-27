import { ISelectBase } from "../selectBase.interface";

export interface ISelectFilterComponent {
    type: "select";
    label?: string;
    filterProperty: string;
    options: {
      [key: string]: any;
    }[];
    selectProps?: ISelectBase;
    shouldShow?: boolean;
  }