import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IColumn } from "./column.interface";

export interface ICustomTable {
  id: string;
  columns: IColumn[];
  columnOrder?: string[];
  columnWidths?: { id: string; value?: number }[];
  pageSize?: number;
  fetchFunction: (args: {
    offset: number;
    limit: number;
    order?: string;
    order_by?: string;
  }) => Promise<{
    data: any[];
    count: number;
    error: any;
  }>;
  fetchFunctionArguments?: any;
  draggableRows?: boolean;
  rowUniqueIdentifier?: string; // Default "id"
  onPageSizeChanged?: (pageSize: number) => void;
  onRowClicked?: (row: {
    index: number;
    original: any;
    updateRow: (value: any) => void;
    removeRow: () => void;
    e: MouseEvent;
  }) => void;
  onSelectionChanged?: (selectedRows: any[]) => void;
  onColumnOrderChanged?: (order: string[]) => void;
  onRowOrderChanged?: (order: {
    endingIndex: number;
    order: any[];
    startingIndex: number;
  }) => void;
  onColumnWidthsChanged?: (widths: { id: any; value?: number }[]) => void;
  onDataChanged?: (data: any[]) => void;
  hidePagination?: boolean;
  scrollableX?: boolean;
  contextMenuItems?: (row: {
    original: any;
    index: number;
    updateRow: (value: any) => void;
    removeRow: () => void;
  }) => React.ReactNode;
  contextMenuHeader?: (row: {
    original: any;
    index: number;
    updateRow: (value: any) => void;
    removeRow: () => void;
  }) => React.ReactNode;
  autoRefreshInterval?: number;
  renderTableActionsHeader?: (
    data: any[],
    count: number,
    page: number,
    pageSize: number,
    isLoading: boolean
  ) => any;

  renderTableActionsChildren?: (
    data: any[],
    isLoading: boolean
  ) => React.ReactNode;
  setTableFunctions?: (functions: {
    insertRow: (object: any, index?: number) => void;
    refresh: () => void;
  }) => void;
  showNoDataText?: string;
  loadOnPageChange?: boolean;
  rowOrderIcon?: IconProp;
  persistPage?: boolean;
  hideRefreshButton?: boolean;
  rowStyleFunction?: (row: { index: number; original: any }) => any;
  checkIfRowIsDraggable?: (original: any) => boolean; // If this field exists and returns true then the drag functionality will be disabled
  renderMobileRow?: (row: {
    index: number;
    original: any;
    updateRow: (value: any) => void;
    removeRow: () => void;
  }) => React.ReactNode;
  style?: any;
}
