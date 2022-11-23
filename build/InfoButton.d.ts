import React from "react";
interface IInfoButton {
    placement?: "auto" | "bottom-start" | "bottom-end" | "top-start" | "top-end" | "top" | "bottom" | "left" | "right";
    children: any;
    className?: string;
}
declare function InfoButton(props: IInfoButton): JSX.Element;
export { InfoButton };
interface InfoButtonContextType {
    isVisible: boolean;
    showInfo: () => void;
}
export declare function useInfoButtonCtx(ref: React.MutableRefObject<HTMLElement | undefined>): InfoButtonContextType;
