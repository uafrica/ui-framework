import { IRow } from "./row.interface";

export interface IColumn {
  width?: number;
  draggable?: boolean; // default true
  header: (() => React.ReactNode) | string;
  id: string;
  accessor: string;
  sortable?: boolean;
  resizable?: boolean;
  cell?: (row: IRow) => React.ReactNode;
  isClickable?: boolean; // default true
  isRightClickable?: boolean;
}
