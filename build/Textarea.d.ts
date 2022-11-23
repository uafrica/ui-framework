interface ITextarea {
    label?: any;
    labelClassName?: string;
    htmlFor?: string;
    containerClassName?: string;
    fieldId?: string;
    className?: string;
    info?: string;
    id?: string;
    value?: any;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    optional?: boolean;
    onChange?: any;
    onFocus?: any;
    onBlur?: any;
    placeholder?: string;
    infoButton?: any;
    register?: any;
    validationError?: any;
    errorMessage?: any;
    fixed?: boolean;
    rows?: any;
    maxLength?: number;
}
declare function Textarea(props: ITextarea): JSX.Element;
export { Textarea };
