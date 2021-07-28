import React from "react";
import { Button, Modal } from ".";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: !!props.visible
    };

    if (props.visible) {
      if (typeof this.props.onShow === "function") {
        this.props.onShow();
      }
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onButtonClick = event => {
    event.stopPropagation();
    if (this.props.disabled) return;

    // Since the modal is inside the button click events will propagate up.
    if (!this.state.isOpened) {
      this.onShow();
    }
  };

  onCancel = event => {
    this.onClose(event);
    if (typeof this.props.onCancel === "function") {
      this.props.onCancel();
    }
  };

  onShow = () => {
    this.setState({
      isOpened: true
    });

    if (typeof this.props.onShow === "function") {
      this.props.onShow();
    }
  };

  onClose = event => {
    if (event) {
      event.stopPropagation();
    }
    this.setState({
      isOpened: false
    });

    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  };

  onConfirm = async event => {
    event.stopPropagation();
    await this.props.onConfirm();

    if (this._isMounted) {
      this.setState({
        isOpened: false
      });
    }
  };

  render() {
    let {
      confirmButtonVariant,
      showCancelButton,
      cancelText,
      className,
      dialogClassName,
      size,
      keyboard,
      backdrop,
      enforceFocus,
      title,
      confirmText,
      style
    } = this.props;

    var cancelButton = showCancelButton ? (
      <Button.Cancel title={cancelText} onClick={this.onCancel} />
    ) : null;

    var modal = (
      <Modal.Small
        show={this.state.isOpened}
        onHide={this.onClose}
        className={className}
        size={size ? size : "lg"}
        dialogClassName={dialogClassName}
        keyboard={keyboard}
        backdrop={backdrop}
        enforceFocus={enforceFocus}
        title={title}
      >
        {this.props.body}
        <Button.ButtonsPanel>
          {cancelButton}
          {(!confirmButtonVariant || confirmButtonVariant === "danger") && (
            <Button.Danger onClick={this.onConfirm} title={confirmText} />
          )}

          {confirmButtonVariant && confirmButtonVariant === "success" && (
            <Button.Primary onClick={this.onConfirm} title={confirmText} />
          )}
        </Button.ButtonsPanel>
      </Modal.Small>
    );

    return (
      <>
        <div onClick={this.onButtonClick} style={style}>
          {this.props.children}
          {modal}
        </div>
      </>
    );
  }
}

export { Confirm };
export default Confirm;
