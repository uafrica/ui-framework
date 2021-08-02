import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Interface
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

// Implementation
function Small(props: ISmallMediumModalProps) {
  return <Base {...props} className="sm:max-w-lg sm:w-full" />;
}

function Medium(props: ISmallMediumModalProps) {
  return <Base {...props} className="sm:max-w-4xl sm:w-full" />;
}

function Large(props: ISmallMediumModalProps) {
  return <Base {...props} className="sm:max-w-full sm:w-full" />;
}

function Base(props: IBaseProps) {
  let { show, title, icon, className, closeButton, disableClickOutsideToClose } = props;

  if (!show) return null;

  let refDiv = useRef(null); // needed for focus trap: https://github.com/tailwindlabs/headlessui/issues/265

  return (
    <Dialog
      as="div"
      static
      className="fixed z-10 inset-0 overflow-y-auto mx-0 sm:mx-20"
      initialFocus={refDiv}
      open={true}
      onClose={!disableClickOutsideToClose && props.onHide ? props.onHide : () => {}}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className={
            "uafrica-modal inline-block align-bottom bg-white rounded-lg p-6 text-left shadow-xl transform transition-all sm:my-16 sm:align-top sm:p-6 " +
            (className ? className : "")
          }
        >
          <div className="sm:flex sm:items-start">
            {icon && (
              <div
                className="
                   h-12 w-12 rounded-full bg-red-100 sm:mr-4 sm:h-10 sm:w-10"
              >
                <FontAwesomeIcon icon={icon} />
              </div>
            )}
            <div className="mt-4 text-center sm:mt-0 sm:text-left w-full">
              {(title || closeButton) && (
                <Dialog.Title className="text-lg leading-6 font-bold mb-4 text-gray-900">
                  {title && title}

                  {closeButton && (
                    <FontAwesomeIcon
                      icon="times"
                      size="sm"
                      className="float-right cursor-pointer hover:text-gray-900 text-gray-700"
                      onClick={props.onHide}
                    />
                  )}
                </Dialog.Title>
              )}
              <div className="mt-2" ref={refDiv}>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function ButtonsPanel(props: any) {
  return <div className="mt-10 flex justify-between w-full">{props.children}</div>;
}

const Modal = {
  ButtonsPanel,
  Small,
  Medium,
  Large
};

export { Modal };
