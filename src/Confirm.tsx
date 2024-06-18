// @ts-ignore
import React from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { useEffect } from "react";
import { useState } from "react";
import { IConfirm } from "./interfaces/confirm.interface";

// Implementation
function Confirm(props: IConfirm) {
  const {
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

  const [isOpen, setOpen] = useState<boolean>(Boolean(props.isVisible));

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

  function renderCancelButton() {
    return showCancelButton ? (
      <Button.Cancel title={cancelText} onClick={onCancel} />
    ) : null;
  }

  function renderConfirmButton() {
    if (!confirmButtonVariant || confirmButtonVariant === "danger") {
      return <Button.Danger onClick={onConfirm} title={confirmText} />;
    }

    if (confirmButtonVariant && confirmButtonVariant !== "danger") {
      return <Button.Primary onClick={onConfirm} title={confirmText} />;
    }

    return null;
  }

  function render() {
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
              {renderCancelButton()}
              {renderConfirmButton()}
            </Modal.ButtonsPanel>
          </Modal.Small>
        )}
      </div>
    );
  }
  return render();
}

export { Confirm };
export default Confirm;
