interface ICounterProps {
    label?: string;
    labelInline?: boolean;
    labelClassName?: string;
    value?: any;
    onChange?: any;
    step?: any;
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
    id?: string;
    autoFocus?: any;
    inputId?: string;
    containerClassName?: string;
    htmlFor?: string;
}
declare function Counter(props: ICounterProps): JSX.Element;
export { Counter };
