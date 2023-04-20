import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
interface IButtonProps {
    id?: string;
    title?: string;
    loadingTitle?: string;
    isLoading?: boolean;
    icon?: IconProp;
    iconSize?: SizeProp;
    tabIndex?: number | undefined;
    onClick?: any;
    center?: boolean;
    className?: string;
    disabled?: boolean;
    hoverTitle?: string;
    leftRounded?: boolean;
    rightRounded?: boolean;
    bgColor?: string;
}
interface ILinkProps {
    id?: string;
    title?: string;
    small?: boolean;
    icon?: IconProp;
    color?: string;
    onClick?: any;
    center?: boolean;
    className?: string;
    disabled?: boolean;
    loadingTitle?: string;
    hoverTitle?: string;
    isLoading?: boolean;
    to?: string;
    target?: string;
    noPadding?: boolean;
    tabIndex?: number | undefined;
}
interface IButtonsPanelProps {
    children: any;
    center?: boolean;
    left?: boolean;
    noMargin?: boolean;
}
declare function Primary(props: IButtonProps): JSX.Element;
declare function Secondary(props: IButtonProps): JSX.Element;
declare function Tertiary(props: IButtonProps): JSX.Element;
declare function Danger(props: IButtonProps): JSX.Element;
declare function Icon(props: IButtonProps): JSX.Element;
declare function Cancel(props: IButtonProps): JSX.Element;
declare function Link(props: ILinkProps): JSX.Element;
declare function LinkDanger(props: ILinkProps): JSX.Element;
declare function ButtonsPanel(props: IButtonsPanelProps): JSX.Element;
declare function Download(props: {
    isDownloading: boolean;
    download: any;
    downloadType: string;
    disabled?: boolean;
}): JSX.Element;
declare function Close(props: IButtonProps): JSX.Element;
declare const Button: {
    Primary: typeof Primary;
    Secondary: typeof Secondary;
    Tertiary: typeof Tertiary;
    Danger: typeof Danger;
    Cancel: typeof Cancel;
    Link: typeof Link;
    LinkDanger: typeof LinkDanger;
    ButtonsPanel: typeof ButtonsPanel;
    Icon: typeof Icon;
    Download: typeof Download;
    Close: typeof Close;
};
export { Button };
