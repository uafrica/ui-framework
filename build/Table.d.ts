interface IProps {
    className?: string;
    nonScrollable?: boolean;
    children: any;
}
declare function TableContainer(props: IProps): JSX.Element;
interface IHeadProps {
    tableHeadColor?: string;
    restProps?: any;
    children: any;
}
declare function Head(props: IHeadProps): JSX.Element;
declare function Row(props: any): JSX.Element;
declare function HeadCol(props: any): JSX.Element;
declare function Body(props: any): JSX.Element;
declare function Col(props: any): JSX.Element;
declare const Table: {
    Table: typeof TableContainer;
    Head: typeof Head;
    Row: typeof Row;
    HeadCol: typeof HeadCol;
    Body: typeof Body;
    Col: typeof Col;
};
export { Table };
