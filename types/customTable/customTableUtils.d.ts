import { IColumn } from "./column.interface";
/** TABLE CLONING */
declare function cloneColumnTable(tableId: any, list: any): any;
declare function cloneRowTable(tableId: any, list: any): any;
/** COLUMN & ROW DRAGGING */
declare const isOnLeft: (nodeA: any, nodeB: any) => boolean;
declare const isAbove: (nodeA: any, nodeB: any) => boolean;
declare const swap: (nodeA: any, nodeB: any) => void;
/** GENERAL */
declare function isColumnClickable(column: IColumn): boolean;
declare function isColumnDraggable(column: IColumn): boolean;
declare function isColumnSortable(column: IColumn): boolean;
declare function isColumnResizable(column: IColumn): boolean;
declare function isRowSelected(selectedRowIdentifiers: string[], rowId: any): boolean;
declare function getColumnById(columns: IColumn[], columnId: string): any;
declare function getColumnWidth(columnWidths: {
    id: string;
    value?: number;
}[], columnId: string): any;
declare function initialiseColumnOrder(columns: IColumn[], columnOrder?: string[]): any[];
declare function getDataByRowId(data: any, rowUniqueIdentifier: any, rowId: any): any;
export { cloneColumnTable, cloneRowTable, isOnLeft, isAbove, swap, isColumnClickable, isColumnDraggable, isColumnSortable, isColumnResizable, isRowSelected, getColumnById, getColumnWidth, initialiseColumnOrder, getDataByRowId };
