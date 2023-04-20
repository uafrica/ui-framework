"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTabs = void 0;
var react_1 = require("react");
var usePrevious_1 = require("./usePrevious");
var react_router_dom_1 = require("react-router-dom");
function useTabs(defaultTab, clearParams) {
    var history = (0, react_router_dom_1.useHistory)();
    var _a = (0, react_1.useState)(), activeTabID = _a[0], setActiveTabID = _a[1];
    var prevLocation = (0, usePrevious_1.usePrevious)(location.search);
    (0, react_1.useEffect)(function () {
        if (!activeTabID || activeTabID === "") {
            return setActiveTabID(defaultTab);
        }
        setActiveTabID(activeTabID);
    }, [activeTabID]);
    (0, react_1.useEffect)(function () {
        if (location.search !== prevLocation) {
            var urlParams = new URLSearchParams(location.search);
            var params = urlParams.get("tab");
            setActiveTabID(params);
        }
    });
    // pass extra params through as object
    function onTabSelected(tab, extraParams, overrideClear) {
        var queryParams = new URLSearchParams(location.search);
        queryParams.set("tab", tab);
        if (extraParams) {
            Object.keys(extraParams).map(function (item) {
                queryParams.set("".concat(item), extraParams[item]);
            });
        }
        history.push({
            pathname: location.pathname,
            search: clearParams && !overrideClear ? "tab=".concat(tab) : queryParams.toString()
        });
    }
    return { activeTabID: activeTabID, onTabSelected: onTabSelected };
}
exports.useTabs = useTabs;
