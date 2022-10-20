import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface IDropdown {
    children: any;
    title?: string;
    square?: boolean;
    icon?: IconProp;
    noBackground?: boolean;
    color?: string;
    id?: string;
    style?: string;
    widthClass?: string;
    buttonWidth?: string;
    borderColor?: string;
    leftRounded?: boolean;
    rightRounded?: boolean;
    buttonStyle?: any;
    between?: boolean;
    padding?: string;
    placement?: "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
}
interface IMenuItem {
    title: string;
    icon?: IconProp;
    onClick: any;
    id?: string;
    disabled?: boolean;
    isLoading?: boolean;
    closeOnClick?: boolean;
}
interface IMenuHeading {
    title: string;
    icon?: IconProp;
    id?: string;
}
interface IMenuItemContainer {
    children: any;
}
declare function DropdownMenu(props: IDropdown): JSX.Element;
declare namespace DropdownMenu {
    var defaultProps: {
        borderColor: string;
    };
}
declare function ContextMenu(props: IDropdown): JSX.Element;
declare function MenuItem(props: IMenuItem): JSX.Element;
declare function MenuItemContainer(props: IMenuItemContainer): JSX.Element;
declare function MenuHeading(props: IMenuHeading): JSX.Element;
declare const Dropdown: {
    MenuItemContainer: typeof MenuItemContainer;
    MenuItem: typeof MenuItem;
    MenuHeading: typeof MenuHeading;
    Menu: typeof DropdownMenu;
    ContextMenu: typeof ContextMenu;
};
export { Dropdown };
