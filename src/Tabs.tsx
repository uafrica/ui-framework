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
}

// Implementation
function Tab(props: ITab) {
  let { children } = props;
  return <div>{children}</div>;
}

function Primary(props: ITabs) {
  let children = props.children.filter((child: any) => child && child.props);
  let activeTab = children.filter((child: any) => props.activeTabID === child.props.tabID);

  return (
    <div>
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {children.map((child: any) => (
              <div
                key={child.props.tabID}
                id={child.props.id}
                onClick={() => props.onSelect(child.props.tabID)}
                className={
                  (props.activeTabID === child.props.tabID
                    ? "border-blue-500 text-blue-600 "
                    : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300") +
                  " cursor-pointer group inline-flex items-center py-3 px-1 border-b-2 font-bold"
                }
              >
                <span className={child.props.className}>
                  {child.props.title}{" "}
                  {child.props.info && <InfoButton>{child.props.info}</InfoButton>}
                </span>
              </div>
            ))}
          </nav>
        </div>
        {activeTab}
      </div>
    </div>
  );
}

function Secondary(props: ITabs) {
  let children = props.children.filter((child: any) => child && child.props);
  let activeTab = children.filter((child: any) => props.activeTabID === child.props.tabID);

  return (
    <div className="mt-8">
      <div>
        <nav className="flex space-x-4 pb-2 border-b border-gray-200" aria-label="Tabs">
          {children.map((child: any) => (
            <div
              key={child.props.tabID}
              id={child.props.id}
              onClick={() => props.onSelect(child.props.tabID)}
              className={
                (props.activeTabID === child.props.tabID
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-200") +
                " cursor-pointer px-3 py-2 font-medium rounded-md"
              }
            >
              <span className={child.props.className}>
                {child.props.title}{" "}
                {child.props.info && <InfoButton>{child.props.info}</InfoButton>}
              </span>
            </div>
          ))}
        </nav>
      </div>
      {activeTab}
    </div>
  );
}

const Tabs = {
  Primary,
  Secondary,
  Tab
};

export { Tabs };
