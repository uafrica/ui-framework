import { IInputProps } from "../inputProps.interface";

export interface ISearchInputFilterComponent {
  type: "search";
  label?: string;
  filterProperty: string;
  inputProps?: IInputProps;
  shouldShow?: boolean;
}
