interface ISelect extends IBase {
    options: any;
}
interface IGroupedSelect extends IBase {
    optionGroups: IOptionGroup[];
}
interface IOptionGroup {
    label?: string;
    options: any[];
}
interface IBase {
    label?: any;
    labelInline?: boolean;
    labelClassName?: string;
    className?: string;
    containerClassName?: string;
    noMargin?: boolean;
    popoverWidth?: string;
    buttonWidth?: string;
    id?: string;
    value?: any;
    info?: any;
    onChange?: (value: any) => void;
    onClick?: () => void;
    onSearchBlur?: () => void;
    onSearchFocus?: () => void;
    disabled?: boolean;
    noSearch?: boolean;
    placeholder?: any;
    multiSelection?: boolean;
    buttons?: any;
    onDelete?: (label: any, value: any) => void;
    allowDeselect?: boolean;
    showAsterisk?: boolean;
    dataTest?: string | undefined;
    showAllButton?: boolean;
}
declare function GroupedSelect(props: IGroupedSelect): JSX.Element;
declare function Select(props: ISelect): JSX.Element;
export { Select, GroupedSelect };
