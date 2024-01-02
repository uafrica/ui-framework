import { IColumn } from "./column.interface";

export interface ICustomTableRow {
  rowId: any;
  columnOrder: string[];
  onRowClicked?: (row: {
    index: number;
    original: any;
    updateRow: (value: any) => void;
    removeRow: () => void;
    e: MouseEvent;
  }) => void;
  dataIndex: number;
  rowData: any;
  data: any;
  onShowMenu: (show: boolean) => void;
  columns: IColumn[];
  columnWidths: { id: string; value?: number }[];
  updateRow: (value: any, dataIndex: number) => void;
  removeRow: (dataIndex: number) => void;
  onRightClick: (event: MouseEvent, rowData: any, dataIndex: number) => void;
  isLoading: boolean;
  rowStyleFunction?: (row: { index: number; original: any }) => any;
}
