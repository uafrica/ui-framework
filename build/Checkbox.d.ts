interface IProps {
    key?: any;
    fieldId?: string;
    onClick?: any;
    label?: any;
    labelClassName?: string;
    htmlFor?: string;
    hoverTitle?: string;
    info?: string;
    className?: string;
    id?: string;
    checked?: boolean;
    center?: boolean;
    disabled?: boolean;
    noPadding?: boolean;
    labelLeft?: boolean;
    labelRight?: boolean;
    textColor?: string;
    dataTest?: string | undefined;
}
declare function Checkbox(props: IProps): JSX.Element;
export { Checkbox };
