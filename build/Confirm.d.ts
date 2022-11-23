interface IProps {
    visible?: boolean;
    disabled?: boolean;
    onConfirm?: any;
    onCancel?: any;
    onClose?: any;
    onShow?: any;
    children: any;
    title: string;
    body?: any;
    confirmText?: string;
    cancelText?: string;
    confirmButtonVariant?: string;
    showCancelButton?: boolean;
    disableClickOutsideToClose?: boolean;
    disablePressEscToClose?: boolean;
}
declare function Confirm(props: IProps): JSX.Element;
export { Confirm };
export default Confirm;
