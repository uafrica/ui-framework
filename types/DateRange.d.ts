declare function DateRange(props: {
    showRange?: boolean;
    showMonth?: boolean;
    period?: string;
    defaultPeriod?: string;
    dateFrom?: any;
    defaultDateFrom?: any;
    dateTo?: any;
    defaultDateTo?: any;
    onPeriodChange?: Function;
    onRangeChange?: Function;
    onMonthChange?: Function;
    periodOptions?: {
        label: string;
        value: string;
    }[];
    containerClassName?: string;
    label?: string;
    disabled?: boolean;
}): JSX.Element;
declare namespace DateRange {
    var defaultProps: {
        label: string;
    };
}
export { DateRange };
