interface IProps {
    handler: Function;
    active: number;
    pages: number;
    setActive: Function;
    isLoading?: boolean;
    setRows?: Function;
    rows?: number;
    scrollRef?: any;
}
declare function Pagination({ handler, active, pages, setActive, isLoading, setRows, rows, scrollRef }: IProps): JSX.Element;
export { Pagination };
