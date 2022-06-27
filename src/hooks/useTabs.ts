import { useState, useEffect } from "react";
import { usePrevious } from "./usePrevious";
import { useHistory } from "react-router-dom";

function useTabs(defaultTab: string, clearParams?: boolean) {
  const history: any = useHistory();
  const [activeTabID, setActiveTabID] = useState<any>();

  const prevLocation = usePrevious(location.search);

  useEffect(() => {
    if (!activeTabID || activeTabID === "") {
      return setActiveTabID(defaultTab);
    }
    setActiveTabID(activeTabID);
  }, [activeTabID]);

  useEffect(() => {
    if (location.search !== prevLocation) {
      const urlParams = new URLSearchParams(location.search);
      let params = urlParams.get("tab");
      setActiveTabID(params);
    }
  });

  // pass extra params through as object
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
      search: clearParams && !overrideClear ? `tab=${tab}` : queryParams.toString()
    });
  }

  return { activeTabID, onTabSelected };
}

export { useTabs };
