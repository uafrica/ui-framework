import "./CustomTable.scss";
import { IColumn } from "./column.interface";
declare function CustomTableRow(props: {
    rowId: any;
    columnOrder: string[];
    onRowClicked?: Function;
    dataIndex: number;
    rowData: any;
    data: any;
    setData: Function;
    onShowMenu: Function;
    columns: IColumn[];
    columnWidths: {
        id: string;
        value?: number;
    }[];
    updateRow: Function;
    removeRow: Function;
    onRightClick: any;
    isLoading: boolean;
}): JSX.Element;
export default CustomTableRow;
