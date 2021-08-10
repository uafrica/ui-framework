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

  return (
    <div className="fixed z-30 inset-0 mx-0 sm:mx-20">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="uafrica-modal-overlay fixed inset-0 bg-black bg-opacity-60 transition-opacity"
          onClick={!disableClickOutsideToClose && props.onHide ? props.onHide : () => {}}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className={
            "uafrica-modal inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-16 sm:align-top " +
            (className ? className : "")
          }
        >
          <div className="sm:flex sm:items-start overflow-auto content p-6">
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
                <div className="text-lg leading-6 font-bold mb-4 text-gray-900">
                  {title && title}

                  {closeButton && (
                    <FontAwesomeIcon
                      icon="times"
                      size="sm"
                      className="float-right cursor-pointer hover:text-gray-900 text-gray-700"
                      onClick={props.onHide}
                    />
                  )}
                </div>
              )}
              <div className="mt-2">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
