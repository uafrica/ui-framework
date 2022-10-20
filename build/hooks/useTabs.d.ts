declare function useTabs(defaultTab: string, clearParams?: boolean): {
    activeTabID: any;
    onTabSelected: (tab: any, extraParams?: any, overrideClear?: boolean | undefined) => void;
};
export { useTabs };
