interface IDatePicker {
    selected: Date;
    label?: string;
    labelInline?: boolean;
    placeholder?: string;
    dateFormat?: string;
    containerClassName?: string;
    minDate?: Date;
    maxDate?: Date;
    showTimeSelect?: boolean;
    onChange: (date: Date) => void;
    onDatePickerClose?: Function;
    disabled?: boolean;
}
export declare const inputStyle: {
    paddingTop: string;
    paddingBottom: string;
};
declare function DatePicker(props: IDatePicker): JSX.Element;
export { DatePicker };
