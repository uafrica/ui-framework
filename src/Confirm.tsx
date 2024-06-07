// @ts-ignore
import React from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { useEffect } from "react";
import { useState } from "react";
import { IConfirm } from "./interfaces/confirm.interface";

// Implementation
function Confirm(props: IConfirm) {
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
    if (props.onCancel) {
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

  function onConfirm(event: any) {
    event.stopPropagation();
    if (props.onConfirm) {
      props.onConfirm(event);
    }

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
