import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { InfoButton } from "./InfoButton";

// Interface
interface ITab {
  children?: any;
  tabID: string;
  id?: string;
  title: string;
  info?: string;
  className?: string;
  isClickable?: boolean;
}

interface ITabs {
  children: any;
  activeTabID: string;
  onSelect: any;
}

function evaluateScroll(tabNavId: any, children: any) {
  let res = { left: false, right: false };
  if (children.length > 0) {
    let nav = document.getElementById(tabNavId)?.getBoundingClientRect();

    let leftId = children[0]?.props?.id ?? children[0]?.props?.tabID;
    if (leftId) {
      let left: any = document.getElementById(leftId)?.getBoundingClientRect();
      if (left?.x < (nav?.x ?? 0)) {
        res.left = true;
      }
    }

    let rightId =
      children[children.length - 1]?.props?.id ?? children[children.length - 1]?.props?.tabID;
    if (rightId) {
      let right: any = document.getElementById(rightId)?.getBoundingClientRect();

      if (right?.x + right?.width > screen.width) {
        res.right = true;
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

  let activeTab = children.filter((child: any) => props.activeTabID === child.props.tabID);

  return (
    <div>
      <div>
        <div className="flex items-center border-b border-gray-200 w-full">
          {overflowing.left && (
            <FontAwesomeIcon icon={"chevron-left"} color="gray" className="m-1" />
          )}

          <nav
            id={tabNavId}
            className={`-mb-px flex space-x-8 overflow-x-auto`}
            onScroll={() => {
              setOverflowing(evaluateScroll(tabNavId, props.children));
            }}
            aria-label="Tabs"
          >
            {children.map((child: any) => (
              <div
                key={child.props.tabID}
                id={child.props.id ?? child.props.tabID}
                onClick={() => {
                  if (child.props.isClickable !== false) {
                    props.onSelect(child.props.tabID);
                  }
                }}
                className={
                  (props.activeTabID === child.props.tabID
                    ? "border-primary-500 text-primary-600 "
                    : "border-transparent text-gray-700  " +
                      (child.props.isClickable !== false
                        ? " hover:text-gray-900 hover:border-gray-300"
                        : "")) +
                  (child.props.isClickable !== false ? " cursor-pointer " : " cursor-default ") +
                  "  group inline-flex items-center py-3 px-1 border-b-2 font-bold"
                }
              >
                <span
                  className={
                    "flex flex-row space-x-4 items-center whitespace-nowrap " +
                    child.props.className
                  }
                >
                  {child.props.title}{" "}
                  {child.props.info && <InfoButton>{child.props.info}</InfoButton>}
                </span>
              </div>
            ))}
          </nav>
          {overflowing.right && (
            <FontAwesomeIcon icon={"chevron-right"} color="gray" className="m-1" />
          )}
        </div>
        <React.Fragment key={props.activeTabID}>{activeTab}</React.Fragment>
      </div>
    </div>
  );
}

function Secondary(props: ITabs) {
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
  let activeTab = children.filter((child: any) => props.activeTabID === child.props.tabID);

  return (
    <div className="mt-8">
      <div className="flex items-center border-b border-gray-200 w-full">
        {overflowing.left && <FontAwesomeIcon icon={"chevron-left"} color="gray" className="m-1" />}
        <nav
          onScroll={() => {
            setOverflowing(evaluateScroll(tabNavId, props.children));
          }}
          id={tabNavId}
          className={`flex space-x-4 overflow-x-auto pb-2 `}
          aria-label="Tabs"
        >
          {children.map((child: any) => (
            <div
              key={child.props.tabID}
              id={child.props.id}
              onClick={() => {
                if (child.props.isClickable !== false) {
                  props.onSelect(child.props.tabID);
                }
              }}
              className={
                (props.activeTabID === child.props.tabID
                  ? "bg-primary-100 text-primary-700 font-bold"
                  : "text-black " +
                    (child.props.isClickable !== false ? " hover:bg-gray-200 " : "")) +
                (child.props.isClickable !== false ? " cursor-pointer " : " cursor-default ") +
                "  px-3 py-2 font-medium rounded-md"
              }
            >
              <span
                className={
                  "u-vertical-center flex-row space-x-4 whitespace-nowrap " + child.props.className
                }
              >
                {child.props.title}{" "}
                {child.props.info && <InfoButton>{child.props.info}</InfoButton>}
              </span>
            </div>
          ))}
        </nav>
        {overflowing.right && (
          <FontAwesomeIcon icon={"chevron-right"} color="gray" className="m-1" />
        )}
      </div>
      <React.Fragment key={props.activeTabID}>{activeTab}</React.Fragment>
    </div>
  );
}

const Tabs = {
  Primary,
  Secondary,
  Tab
};

export { Tabs };
