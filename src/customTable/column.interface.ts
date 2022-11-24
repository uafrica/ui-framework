export interface IColumn {
  width?: number;
  draggable?: boolean; // default true
  header: any | Function;
  id: string;
  accessor: string;
  sortable?: boolean;
  resizable?: boolean;
  cell?: Function;
  isClickable?: boolean; // default true
}