interface ISavePanel {
    somethingChanged: boolean;
    saveError?: any;
    savingChanges: boolean;
    saved?: boolean;
    saveDisabledText?: string;
    saveText?: string;
    cancelText?: string;
    className?: string;
    cancelChanges?: any;
    saveChanges: any;
    callToActionAtBottom?: boolean;
}
interface ISavePanelContainer {
    children: any;
    inModal?: boolean;
}
declare function SavePanel(props: ISavePanel): JSX.Element;
declare function SavePanelContainer(props: ISavePanelContainer): JSX.Element;
export { SavePanel, SavePanelContainer };
