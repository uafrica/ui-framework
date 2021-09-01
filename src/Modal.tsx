import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useRef } from "react";
import ReactDOM from "react-dom";

interface ISmallMediumModalProps {
  show: boolean;
  children: any;
  onHide?: any;
  title?: any;
  icon?: IconProp;
  closeButton: boolean;
  disableClickOutsideToClose?: boolean;
}

interface IBaseProps extends ISmallMediumModalProps {
  className?: string;
}

export const ModalContext = createContext({});

export const hostElementId = "modal-host";

const isBrowser = () =>
  !!(typeof window !== "undefined" && window.document && window.document.createElement);

const Base = ({
  show,
  onHide,
  children,
  className,
  icon,
  title,
  closeButton,
  disableClickOutsideToClose,
  ...props
}: IBaseProps) => {
  const ref = useRef(null);
  if (!show) {
    return null;
  }
  const hostElement = document.getElementById(hostElementId);

  const content = (
    <ModalContext.Provider value={{ onHide, parentRef: ref }}>
      <div
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
        <div className="overflow-auto content p-6 pb-0 pt-0 ">
          {icon && (
            <div className="h-12 w-12 rounded-full bg-red-100 sm:mr-4 sm:h-10 sm:w-10">
              <FontAwesomeIcon icon={icon} />
            </div>
          )}
          <div className="mt-4 text-center sm:mt-0 sm:text-left w-full">
            {(title || closeButton) && (
              <div className="ua-modal-actions-panel flex justify-between items-center z-30 text-lg font-bold text-gray-900 text-left pb-4">
                {title && title}

                {closeButton && (
                  <FontAwesomeIcon
                    icon="times"
                    size="sm"
                    className="float-right cursor-pointer hover:text-gray-900 text-gray-700"
                    onClick={onHide}
                  />
                )}
              </div>
            )}

            <div className={title || closeButton ? "mt-20" : "mt-24 md:mt-20"}>{children}</div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );

  if (hostElement && isBrowser()) {
    return ReactDOM.createPortal(content, hostElement);
  }

  console.warn('Could not find "<Modal.Host />" node.\n Switched to inline rendering mode.');
  return content;
};

function Host(props: any) {
  return <div {...props} id={hostElementId} />;
}
function Small(props: ISmallMediumModalProps) {
  return <Base {...props} className="w-11/12 md:w-1/4 mt-14" />;
}

function Medium(props: ISmallMediumModalProps) {
  return <Base {...props} className="w-11/12 md:w-1/2 mt-14" />;
}

function Large(props: ISmallMediumModalProps) {
  return <Base {...props} className="w-11/12 mt-14" />;
}

function ButtonsPanel(props: any) {
  return <div className="mt-10 flex justify-between w-full">{props.children}</div>;
}

const Modal = {
  ButtonsPanel,
  Small,
  Medium,
  Large,
  Host
};

export { Modal };
