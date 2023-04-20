/// <reference types="react" />
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ISmallMediumModalProps {
    show: boolean;
    children: any;
    onHide?: any;
    title?: any;
    icon?: IconProp;
    closeButton: boolean;
    disableClickOutsideToClose?: boolean;
    disablePressEscToClose?: boolean;
}
export declare const ModalContext: import("react").Context<{}>;
export declare const hostElementId = "modal-host";
declare function Host(props: any): JSX.Element;
declare function Small(props: ISmallMediumModalProps): JSX.Element;
declare function Medium(props: ISmallMediumModalProps): JSX.Element;
declare function Large(props: ISmallMediumModalProps): JSX.Element;
declare function ButtonsPanel(props: any): JSX.Element;
declare const Modal: {
    ButtonsPanel: typeof ButtonsPanel;
    Small: typeof Small;
    Medium: typeof Medium;
    Large: typeof Large;
    Host: typeof Host;
};
export { Modal };
