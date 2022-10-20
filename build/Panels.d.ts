import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface IProps {
    children?: any;
    title?: any;
    className?: string;
    onClose?: any;
}
interface IPageActionsPanelProps {
    children?: any;
    title?: any;
    className?: string;
    onClose?: any;
    icon?: IconProp;
    uppercase?: boolean;
}
interface ISectionActionsPanel {
    children?: any;
    title?: any;
    className?: string;
    toggleEditMode?: any;
    hideEditMode?: boolean;
    icon?: IconProp;
    iconColor?: string;
}
interface IFiltersPanel {
    children?: any;
    className?: string;
}
declare function TableActionsPanel(props: IProps): JSX.Element;
declare function SectionActionsPanel(props: ISectionActionsPanel): JSX.Element;
declare function PageActionsPanel(props: IPageActionsPanelProps): JSX.Element;
declare function ModalActionsPanel(props: IProps): JSX.Element;
declare function FiltersPanel(props: IFiltersPanel): JSX.Element;
export { TableActionsPanel, SectionActionsPanel, PageActionsPanel, FiltersPanel, ModalActionsPanel };
