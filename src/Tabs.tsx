import React from "react";
import { InfoButton } from "./InfoButton";

// Interface
interface ITab {
  children?: any;
  tabID: string;
  id?: string;
  title: string;
  info?: string;
  className?: string;
}

interface ITabs {
  children: any;
  activeTabID: string;
  onSelect: any;
  wrapTabsForMobile?: boolean;
}

// Implementation
function Tab(props: ITab) {
  let { children } = props;
  return <div key={props.tabID}>{children}</div>;
}

function Primary(props: ITabs) {
  let children = props.children;
  if (!Array.isArray(props.children)) {
    children = [props.children];
  }

  children = children.filter((child: any) => child && child.props);
  let activeTab = children.filter((child: any) => props.activeTabID === child.props.tabID);

  return (
    <div>
      <div>
        <div className="border-b border-gray-200">
          <nav
            className={`-mb-px flex ${
              props.wrapTabsForMobile
                ? " flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-8 "
                : " space-x-8 "
            }`}
            aria-label="Tabs"
          >
            {children.map((child: any) => (
              <div
                key={child.props.tabID}
                id={child.props.id}
                onClick={() => props.onSelect(child.props.tabID)}
                className={
                  (props.activeTabID === child.props.tabID
                    ? "border-primary-500 text-primary-600 "
                    : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300") +
                  " cursor-pointer group inline-flex items-center py-3 px-1 border-b-2 font-bold"
                }
              >
                <span className={"flex flex-row space-x-4 items-center " + child.props.className}>
                  {child.props.title}{" "}
                  {child.props.info && <InfoButton>{child.props.info}</InfoButton>}
                </span>
              </div>
            ))}
          </nav>
        </div>
        <React.Fragment key={props.activeTabID}>{activeTab}</React.Fragment>
      </div>
    </div>
  );
}

function Secondary(props: ITabs) {
  let children = props.children;
  if (!Array.isArray(props.children)) {
    children = [props.children];
  }

  children = children.filter((child: any) => child && child.props);
  let activeTab = children.filter((child: any) => props.activeTabID === child.props.tabID);

  return (
    <div className="mt-8">
      <div>
        <nav
          className={`flex ${
            props.wrapTabsForMobile
              ? " flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 "
              : " space-x-4 "
          } pb-2 border-b border-gray-200`}
          aria-label="Tabs"
        >
          {children.map((child: any) => (
            <div
              key={child.props.tabID}
              id={child.props.id}
              onClick={() => props.onSelect(child.props.tabID)}
              className={
                (props.activeTabID === child.props.tabID
                  ? "bg-primary-100 text-primary-700 font-bold"
                  : "text-black hover:bg-gray-200") +
                " cursor-pointer px-3 py-2 font-medium rounded-md"
              }
            >
              <span className={"u-vertical-center flex-row space-x-4 " + child.props.className}>
                {child.props.title}{" "}
                {child.props.info && <InfoButton>{child.props.info}</InfoButton>}
              </span>
            </div>
          ))}
        </nav>
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
