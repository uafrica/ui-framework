import { PageHeading, Tabs } from "../../../src";
import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Modals from "./Modals";
import Forms from "./Forms";
import CornelScratchPad from "CornelScratchPad";
import Tables from "./Tables";
import Buttons from "./Buttons";
import Utils from "./Utils";

function TabsPage() {
  const history = useHistory();
  const location = useLocation();
  const [activeTabID, setActiveTabID] = useState<any>();

  const prevLocation = usePrevious(location.search);

  useEffect(() => {
    {
      activeTabID ? setActiveTabID(activeTabID) : setActiveTabID("forms");
    }
  });

  useEffect(() => {
    if (location.search !== prevLocation) {
      const urlParams = new URLSearchParams(location.search);
      let params = urlParams.get("tab");
      setActiveTabID(params);
    }
  });

  function onTabSelected(tab: string) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("tab", tab);

    history.push({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  }

  return (
    <>
      <PageHeading uppercase={false}>Bob Group UI Component playground</PageHeading>
      <Tabs.Primary activeTabID={activeTabID} onSelect={(tabID: string) => onTabSelected(tabID)}>
        <Tabs.Tab tabID={"forms"} title={"Forms"}>
          <Forms />
        </Tabs.Tab>
        <Tabs.Tab tabID={"dialog"} title={"Modals"}>
          <Modals />
        </Tabs.Tab>
        <Tabs.Tab tabID={"table"} title={"Tables"}>
          <Tables />
        </Tabs.Tab>
        <Tabs.Tab tabID={"buttons"} title={"Buttons"}>
          <Buttons />
        </Tabs.Tab>
        <Tabs.Tab tabID={"utils"} title={"Utils"}>
          <Utils />
        </Tabs.Tab>
        <Tabs.Tab tabID={"cornel"} title={"Cornel's scratchpad"}>
          <CornelScratchPad />
        </Tabs.Tab>
      </Tabs.Primary>
    </>
  );
}

export default TabsPage;

// use previous hook to check location search params
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
