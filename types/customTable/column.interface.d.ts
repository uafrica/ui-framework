export interface IColumn {
    width?: number;
    draggable?: boolean;
    header: any | Function;
    id: string;
    accessor: string;
    sortable?: boolean;
    resizable?: boolean;
    cell?: Function;
    isClickable?: boolean;
}
