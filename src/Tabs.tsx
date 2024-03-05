// @ts-ignore
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoButton } from "./InfoButton";

// Interface
interface ITab {
  children?: any;
  tabID: string;
  id?: string;
  title?: string;
  titleHTML?: any;
  info?: string;
  className?: string;
  isClickable?: boolean;
}

interface ITabs {
  children: any;
  activeTabID: string;
  onSelect: any;
}

interface IGenericTabs extends ITabs {
  isPrimary?: boolean;
}

function evaluateScroll(tabNavId: any, children: any) {
  let res = { left: false, right: false };
  if (children.length > 0) {
    let navElement = document.getElementById(tabNavId);
    if (navElement) {
      if (navElement.scrollLeft > 0) {
        res.left = true;
      } else {
        res.left = false;
      }

      if (
        navElement.scrollLeft <
        navElement.scrollWidth - navElement.clientWidth
      ) {
        res.right = true;
      } else {
        res.right = false;
      }
    }
  }

  return res;
}

// Implementation
function Tab(props: ITab) {
  let { children } = props;
  return <div key={props.tabID}>{children}</div>;
}

function Primary(props: ITabs) {
  return <Generic {...props} isPrimary />;
}

function Secondary(props: ITabs) {
  return <Generic {...props} />;
}

function Generic(props: IGenericTabs) {
  let [overflowing, setOverflowing] = useState({ left: false, right: false });

  let tabNavId = "tab_nav" + Math.random();
  useEffect(() => {
    setOverflowing(evaluateScroll(tabNavId, props.children));
  }, [props.children]);

  let children = props.children;
  if (!Array.isArray(props.children)) {
    children = [props.children];
  }

  children = children.filter((child: any) => child && child.props);

  let activeTab = children.filter(
    (child: any) => props.activeTabID === child.props.tabID
  );

  return (
    <div>
      <div>
        <div
          className={
            "flex items-center border-b border-gray-200 w-full " +
            (props.isPrimary ? "" : "mt-8 pb-2")
          }
        >
          {overflowing.left && (
            <FontAwesomeIcon icon="chevron-left" color="gray" className="m-1" />
          )}

          <nav
            id={tabNavId}
            className="-mb-px flex space-x-0 max-md:space-x-4 md:space-x-8 overflow-x-auto"
            onScroll={() => {
              setOverflowing(evaluateScroll(tabNavId, props.children));
            }}
            aria-label="Tabs"
          >
            {children.map((child: any) => {
              let tabClassName = props.isPrimary
                ? (props.activeTabID === child.props.tabID
                    ? "border-primary-500 text-primary-600 "
                    : "border-transparent text-gray-700  " +
                      (child.props.isClickable !== false
                        ? " hover:text-gray-900 hover:border-gray-300"
                        : "")) +
                  (child.props.isClickable !== false
                    ? " cursor-pointer "
                    : " cursor-default ") +
                  "  group inline-flex items-center py-3 px-1 border-b-2 font-bold"
                : (props.activeTabID === child.props.tabID
                    ? "bg-primary-100 text-primary-700 font-bold"
                    : "text-black " +
                      (child.props.isClickable !== false
                        ? " hover:bg-gray-200 "
                        : "")) +
                  (child.props.isClickable !== false
                    ? " cursor-pointer "
                    : " cursor-default ") +
                  "  px-3 py-2 rounded-md";
              return (
                <div
                  key={child.props.tabID}
                  id={child.props.id ?? child.props.tabID}
                  onClick={() => {
                    if (child.props.isClickable !== false) {
                      props.onSelect(child.props.tabID);
                    }
                  }}
                  className={tabClassName}
                >
                  <span
                    className={
                      "flex flex-row space-x-4 items-center whitespace-nowrap " +
                      child.props.className
                    }
                  >
                    {child.props.title}{" "}
                    {child.props.titleHTML && child.props.titleHTML}
                    {child.props.info && (
                      <InfoButton>{child.props.info}</InfoButton>
                    )}
                  </span>
                </div>
              );
            })}
          </nav>
          {overflowing.right && (
            <FontAwesomeIcon
              icon="chevron-right"
              color="gray"
              className="m-1"
            />
          )}
        </div>
        <React.Fragment key={props.activeTabID}>{activeTab}</React.Fragment>
      </div>
    </div>
  );
}

const Tabs = {
  Primary,
  Secondary,
  Tab,
};

export { Tabs };
