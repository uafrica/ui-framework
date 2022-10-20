interface IInfoPopover {
    placement?: "auto" | "bottom-start" | "bottom-end" | "top-start" | "top-end" | "top" | "bottom" | "left" | "right";
    children: any;
    popoverContent: any;
    showPopover: boolean;
    onPopoverDismiss: Function;
    width?: string;
}
declare function InfoPopover(props: IInfoPopover): JSX.Element;
export { InfoPopover };
