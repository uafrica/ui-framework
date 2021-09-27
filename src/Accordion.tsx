import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Confirm } from "./Confirm";

// Interface
interface IAccordion {
  className?: string;
  title: any;
  overrideOpen?: boolean;
  children: any;
  onDelete?: any;
  backgroundColor?: string;
  textColor?: string;
}

function Accordion(props: IAccordion) {
  let { className, overrideOpen, title, children, onDelete, backgroundColor, textColor } = props;

  useEffect(() => {
    setOpen(Boolean(overrideOpen));
  }, [overrideOpen]);

  let [open, setOpen] = useState<boolean>(Boolean(overrideOpen));

  return (
    <div className={className}>
      <div className="w-full p-2 mx-auto bg-white rounded-2xl">
        <div
          onClick={() => setOpen(!open)}
          className={`cursor-pointer flex w-full space-x-4 px-4 py-2 text-md items-center font-bold text-left text-${textColor}-900 bg-${backgroundColor}-100 rounded-lg hover:bg-${backgroundColor}-200 focus:outline-none focus-visible:ring focus-visible:ring-${backgroundColor}-500 focus-visible:ring-opacity-75`}
        >
          <span className="w-full">{title}</span>
          <div className="flex space-x-4">
            {onDelete && (
              <Confirm
                onConfirm={() => {
                  onDelete();
                }}
                title="Delete item?"
                body="Are you sure you want to delete the item?"
                confirmText="Delete"
              >
                <FontAwesomeIcon icon="trash" className="delete" title="Delete item" />
              </Confirm>
            )}
            <FontAwesomeIcon
              icon="caret-down"
              className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-primary-500`}
            />
          </div>
        </div>
        <Transition
          show={open}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="mt-4">{children}</div>
        </Transition>
      </div>
    </div>
  );
}

Accordion.defaultProps = {
  backgroundColor: "primary",
  textColor: "primary"
};

export default Accordion;
