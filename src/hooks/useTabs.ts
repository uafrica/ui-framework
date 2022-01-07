import { useState, useEffect } from "react";
import { usePrevious } from "./usePrevious";
import { useHistory } from "react-router-dom";

function useTabs(defaultTab: string) {
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

  function onTabSelected(tab: any) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("tab", tab);

    history.push({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  }

  return { activeTabID, onTabSelected };
}

export { useTabs };
