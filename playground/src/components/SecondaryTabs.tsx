import { Tabs } from "../../../src";
import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

function SecondaryTabsPage() {
  const history = useHistory();
  const location = useLocation();
  const [activeTabID, setActiveTabID] = useState<any>();

  const prevLocation = usePrevious(location.search);

  useEffect(() => {
    {
      activeTabID ? setActiveTabID(activeTabID) : setActiveTabID("tab1");
    }
  });

  useEffect(() => {
    if (location.search !== prevLocation) {
      const urlParams = new URLSearchParams(location.search);
      let params = urlParams.get("tab2");
      setActiveTabID(params);
    }
  });

  function onTabSelected(tab: string) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("tab2", tab);

    history.push({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  }

  return (
    <>
      <Tabs.Secondary activeTabID={activeTabID} onSelect={(tabID: string) => onTabSelected(tabID)}>
        <Tabs.Tab tabID="tabs1" title="Tabs 1">
          Test 1
        </Tabs.Tab>
        <Tabs.Tab tabID="tabs2" title="Tabs 2">
          Test 2
        </Tabs.Tab>
        <Tabs.Tab tabID="tabs3" title="Tabs 3">
          Test 3
        </Tabs.Tab>
      </Tabs.Secondary>
    </>
  );
}

export default SecondaryTabsPage;

// use previous hook to check location search params
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
