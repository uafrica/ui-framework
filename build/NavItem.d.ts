import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface INavItem {
    path: string;
    displayName: string;
    icon: IconProp;
}
interface IProps {
    item: INavItem;
    isNavbarCollapsed: boolean;
}
declare function NavItem(props: IProps): JSX.Element;
declare function NavItemDivider(): JSX.Element;
export { NavItem, NavItemDivider };
