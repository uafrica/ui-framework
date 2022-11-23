interface IRadioButtonProps {
    label: string;
    onChange?: any;
    checked?: boolean;
    disabled?: boolean;
    labelClassName?: string;
    className?: string;
    labelLeft?: boolean;
    labelRight?: boolean;
    name: string;
}
interface IRadioGroupProps {
    title?: any;
    options: string[];
    onChange?: any;
    disabled?: boolean;
    labelClassName?: string;
    className?: string;
    labelLeft?: boolean;
    labelRight?: boolean;
    name: string;
}
declare function Button(props: IRadioButtonProps): JSX.Element;
declare function Group(props: IRadioGroupProps): JSX.Element;
declare const Radio: {
    Button: typeof Button;
    Group: typeof Group;
};
export { Radio };
