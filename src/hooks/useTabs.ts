import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useTabs(defaultTab: string, clearParams?: boolean) {
  const history: any = useHistory();
  const [activeTabID, setActiveTabID] = useState<any>();

  useEffect(() => {
    if (!activeTabID || activeTabID === "") {
      if (activeTabID !== defaultTab) {
        setActiveTabID(defaultTab);
      }
    } else {
      setActiveTabID(activeTabID);
    }
  }, [activeTabID]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let tab = urlParams.get("tab");
    if (tab === null) {
      tab = defaultTab;
    }
    setActiveTabID(tab);
  }, [location.search]);

  // Pass extra params through as object
  function onTabSelected(tab: any, extraParams?: any, overrideClear?: boolean) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("tab", tab);

    if (extraParams) {
      Object.keys(extraParams).map((item: any) => {
        queryParams.set(`${item}`, extraParams[item]);
      });
    }

    history.push({
      pathname: location.pathname,
      search:
        clearParams && !overrideClear ? `tab=${tab}` : queryParams.toString(),
    });
  }

  return { activeTabID, onTabSelected };
}

export { useTabs };
