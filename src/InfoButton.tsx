import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";

// Interface
interface IInfoButton {
  placement?: string;
  children: any;
  className?: string;
}

function InfoButton(props: IInfoButton) {
  let { children, className, placement } = props;

  let placementClass = "left-0 ";
  if (placement === "bottom-left") {
    placementClass = " right-0 ";
  }

  return (
    <div className="ml-4">
      <Menu as="div" className="relative text-left">
        {({ open }) => (
          <>
            <Menu.Button className="flex items-center justify-center w-full bg-white font-medium text-primary hover:bg-primary-50 focus:outline-none rounded-full">
              <FontAwesomeIcon icon="info-circle" className={className ? className : ""} />
            </Menu.Button>

            <Transition
              show={Boolean(open)}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={
                  "z-50 origin-top-right absolute " +
                  placementClass +
                  " font-normal p-4 w-80 rounded-md shadow-md bg-white divide-y ring-1 ring-black ring-opacity-5 divide-gray-100 focus:outline-none"
                }
              >
                {children}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}

export { InfoButton };
