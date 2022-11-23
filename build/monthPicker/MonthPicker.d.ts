interface IMonthPicker {
    dateFrom: Date;
    label?: string;
    labelInline?: boolean;
    placeholder?: string;
    containerClassName?: string;
    minDate?: Date;
    maxDate?: Date;
    onChange: (date: Date) => void;
    onMonthPickerClose?: Function;
    disabled?: boolean;
    dataTest?: string | undefined;
}
export declare const inputStyle: {
    paddingTop: string;
    paddingBottom: string;
};
declare function MonthPicker(props: IMonthPicker): JSX.Element;
export { MonthPicker };
