import { useEffect } from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

// Interface
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
}

// Implementation
function Confirm(props: IProps) {
  let { confirmButtonVariant, showCancelButton, cancelText, body, children, title, confirmText } =
    props;

  let [isOpen, setOpen] = useState<boolean>(!!props.visible);

  useEffect(() => {
    if (props.visible) {
      if (typeof props.onShow === "function") {
        props.onShow();
      }
    }
  });

  function onCancel(event: any) {
    onClose(event);
    if (typeof props.onCancel === "function") {
      props.onCancel();
    }
  }

  function onShow() {
    setOpen(true);

    if (typeof props.onShow === "function") {
      props.onShow();
    }
  }

  function onClose(event: any) {
    if (event) {
      event.stopPropagation();
    }
    setOpen(false);

    if (typeof props.onClose === "function") {
      props.onClose();
    }
  }

  async function onConfirm(event: any) {
    event.stopPropagation();
    await props.onConfirm();

    setOpen(false);
  }

  function onButtonClick(event: any) {
    event.stopPropagation();
    if (props.disabled) return;

    // Since the modal is inside the button click events will propagate up.
    if (!isOpen) {
      onShow();
    }
  }

  var cancelButton = showCancelButton ? (
    <Button.Cancel title={cancelText} onClick={onCancel} />
  ) : null;

  return (
    <div onClick={onButtonClick} className="flex items-center">
      {children}
      <Modal.Small show={isOpen} onHide={onClose} title={title} closeButton>
        {body}
        <Button.ButtonsPanel>
          {cancelButton}
          {(!confirmButtonVariant || confirmButtonVariant === "danger") && (
            <Button.Danger onClick={onConfirm} title={confirmText} />
          )}

          {confirmButtonVariant && confirmButtonVariant !== "danger" && (
            <Button.Primary onClick={onConfirm} title={confirmText} />
          )}
        </Button.ButtonsPanel>
      </Modal.Small>
    </div>
  );
}

export { Confirm };
export default Confirm;
