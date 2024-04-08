// @ts-ignore
import React, { createContext, useEffect, useRef, useState } from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ISmallMediumModalProps {
  children: any;
  onHide?: any;
  title?: any;
  icon?: IconProp;
  showCloseButton: boolean;
  disableClickOutsideToClose?: boolean;
  disablePressEscToClose?: boolean;
  margin?: string;
}

interface IBaseProps extends ISmallMediumModalProps {
  className?: string;
}

export const ModalContext = createContext({});

export const hostElementId = "modal-host";

const isBrowser = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

const Base = ({
  onHide,
  children,
  className,
  icon,
  title,
  showCloseButton: closeButton,
  disableClickOutsideToClose,
  disablePressEscToClose,
  margin,
  ...props
}: IBaseProps) => {
  let elements = document.getElementsByClassName("uafrica-modal-overlay");

  const [modalId] = useState(`modal_${elements.length}`);
  useEffect(() => {
    if (!disablePressEscToClose) {
      window.addEventListener("keydown", listenForEscape);
      return () => {
        window.removeEventListener("keydown", listenForEscape);
      };
    } else {
      return;
    }
  }, [disablePressEscToClose]);

  function listenForEscape(e: any) {
    if (e.key === "Escape" && onHide !== undefined) {
      let elements = document.getElementsByClassName("uafrica-modal-overlay");
      if (elements.length > 0 && elements[elements.length - 1].id === modalId) {
        e.preventDefault();
        onHide(e);
      }
    }
  }

  const ref = useRef(null);
  const hostElement = document.getElementById(hostElementId);

  const content = (
    <ModalContext.Provider value={{ onHide, parentRef: ref }}>
      <div
        id={modalId}
        className="uafrica-modal-overlay fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        onClick={!disableClickOutsideToClose && onHide ? onHide : () => {}}
      />
      <div
        className={
          "uafrica-modal bg-white fixed top-0 left-1/2 transform -translate-x-1/2 rounded-lg text-left shadow-xl pb-4 pt-4 " +
          className
        }
        ref={ref}
        {...props}
      >
        <div className="overflow-auto content px-6 py-0">
          {icon && (
            <div className="h-12 w-12 rounded-full bg-red-100 sm:mr-4 sm:h-10 sm:w-10">
              <FontAwesomeIcon icon={icon} />
            </div>
          )}
          <div className="mt-4 text-center sm:mt-0 sm:text-left w-full">
            {(title || closeButton) && (
              <div className="ua-modal-actions-panel  flex items-center  justify-between z-30 text-lg font-bold text-gray-900 text-left pb-4">
                {title && title}

                {closeButton && <Button.Close onClick={onHide} />}
              </div>
            )}

            <div
              className={title || closeButton ? "mt-10 pt-6" : margin ? margin : "mt-24 md:mt-20"}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );

  if (hostElement && isBrowser()) {
    return ReactDOM.createPortal(content, hostElement);
  }

  console.warn(
    'Could not find "<Modal.Host />" node.\n Switched to inline rendering mode.'
  );
  return content;
};

function Host(props: any) {
  return <div {...props} id={hostElementId} />;
}
function Small(props: ISmallMediumModalProps) {
  return <Base {...props} className=" my-4 small-modal" />;
}

function Medium(props: ISmallMediumModalProps) {
  return <Base {...props} className=" my-4 medium-modal" />;
}

function Large(props: ISmallMediumModalProps) {
  return <Base {...props} className=" my-4 large-modal" />;
}

function ButtonsPanel(props: any) {
  return (
    <div
      className={
        props.fixed
          ? "fixed bottom-0 ua-modal-buttons-panel shadow-inner z-20 p-4 pb-4 mb-1 bg-white"
          : "mb-1"
      }
    >
      <div
        className={
          (props.fixed ? "" : "mt-10 ") +
          "  flex flex-col-reverse sm:flex-row space-y-4 sm:space-y-0 space-y-reverse space-x-0 sm:space-x-4  justify-between  "
        }
      >
        {props.children}
      </div>
    </div>
  );
}

const Modal = {
  ButtonsPanel,
  Small,
  Medium,
  Large,
  Host,
};

export { Modal };
