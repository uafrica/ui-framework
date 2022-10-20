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
declare function Tab(props: ITab): JSX.Element;
declare function Primary(props: ITabs): JSX.Element;
declare function Secondary(props: ITabs): JSX.Element;
declare const Tabs: {
    Primary: typeof Primary;
    Secondary: typeof Secondary;
    Tab: typeof Tab;
};
export { Tabs };
