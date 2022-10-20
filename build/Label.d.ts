interface ILabel {
    children?: any;
    className?: string;
    htmlFor?: any;
    noMargin?: boolean;
    labelColor?: string;
}
interface ILabelWithValue {
    label: string;
    value: any;
    noMargin?: boolean;
    info?: string;
    labelColor?: string;
    doNotShowEnDash?: boolean;
}
declare function Label(props: ILabel): JSX.Element;
declare function LabelWithValue(props: ILabelWithValue): JSX.Element;
export { Label, LabelWithValue };
