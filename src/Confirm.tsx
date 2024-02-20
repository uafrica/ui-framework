// @ts-ignore
import React from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { useEffect } from "react";
import { useState } from "react";

// Interface
interface IProps {
  isVisible?: boolean;
  isDisabled?: boolean;
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

// Implementation
function Confirm(props: IProps) {
  let {
    confirmButtonVariant,
    showCancelButton,
    cancelText,
    body,
    children,
    title,
    confirmText,
    disableClickOutsideToClose,
    disablePressEscToClose,
  } = props;

  let [isOpen, setOpen] = useState<boolean>(Boolean(props.isVisible));

  useEffect(() => {
    if (props.isVisible) {
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
    if (props.isDisabled) return;

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
      {isOpen && (
        <Modal.Small
          onHide={onClose}
          title={title}
          showCloseButton
          disableClickOutsideToClose={disableClickOutsideToClose}
          disablePressEscToClose={disablePressEscToClose}
        >
          {body}
          <Modal.ButtonsPanel>
            {cancelButton}
            {(!confirmButtonVariant || confirmButtonVariant === "danger") && (
              <Button.Danger onClick={onConfirm} title={confirmText} />
            )}

            {confirmButtonVariant && confirmButtonVariant !== "danger" && (
              <Button.Primary onClick={onConfirm} title={confirmText} />
            )}
          </Modal.ButtonsPanel>
        </Modal.Small>
      )}
    </div>
  );
}

export { Confirm };
export default Confirm;
