import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface INavItem {
  path: string;
  displayName: string;
  icon: IconProp;
}

interface IProps {
  item: INavItem;
  isNavbarCollapsed: boolean;
}

function NavItem(props: IProps) {
  let { item } = props;

  let linkIsActive = window.location.pathname.indexOf(item.path) >= 0;
  let bgClass = "";
  if (linkIsActive) {
    bgClass = "bg-gray-100 font-semibold";
  }

  return (
    <div
      id={"nav_" + item.displayName.replaceAll(" ", "_").toLowerCase()}
      className={
        "text-gray-700 hover:bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-1.5 rounded-md mb-1 " +
        bgClass
      }
    >
      <div className="w-4 mr-2 text-center">
        <FontAwesomeIcon icon={item.icon} size="xs" />{" "}
      </div>
      {props.isNavbarCollapsed ? " " : item.displayName}
    </div>
  );
}

function NavItemDivider() {
  return <hr className="border-0 bg-gray-200 h-px my-2" />;
}

export { NavItem, NavItemDivider };
