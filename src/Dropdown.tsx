import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Interface
interface IDropdown {
  children: any;
  title?: string;
  icon?: IconProp;
  noBackground?: boolean;
  id?: string;
}

interface IMenuItem {
  title: string;
  icon?: IconProp;
  onClick: any;
  id?: string;
}

// Implementation
function DropdownMenu(props: IDropdown) {
  let { title, icon, noBackground, id } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              id={id}
              className={
                "inline-flex justify-center w-full px-4 py-2 font-medium text-gray-700  focus:outline-none " +
                (noBackground
                  ? "hover:text-gray-900 font-bold"
                  : "hover:bg-gray-50 border-gray-300 shadow-sm rounded-full border bg-white")
              }
            >
              {icon && <FontAwesomeIcon icon={icon} className="h-5 w-5" aria-hidden="true" />}
              {Boolean(title) && <span className="ml-2">{title}</span>}
              <FontAwesomeIcon
                icon="caret-down"
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

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
              className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              {props.children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

function ContextMenu(props: IDropdown) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Transition
        show={true}
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
          className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
        >
          {props.children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function MenuItem(props: IMenuItem) {
  let { title, icon, id } = props;

  return (
    <div id={id}>
      <Menu.Item>
        {({ active }) => (
          <div
            className={
              "group flex items-center px-4 py-2 cursor-pointer font-semibold " +
              (active ? "bg-gray-100 text-gray-900" : "text-gray-700")
            }
            onClick={() => {
              document.body.click();
              props.onClick();
            }}
          >
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900"
                aria-hidden="true"
              />
            )}
            {title}
          </div>
        )}
      </Menu.Item>
    </div>
  );
}

const Dropdown = {
  MenuItem,
  Menu: DropdownMenu,
  ContextMenu
};

export { Dropdown };
