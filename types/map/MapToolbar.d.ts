declare function MapToolbar(props: {
    editMode: "draw" | "select" | null;
    onSelectModeClicked: Function;
    onDrawModeClicked: Function;
    doSnap: boolean;
    onSnapToggle: Function;
    customToolbarButtons?: any[];
}): JSX.Element;
export default MapToolbar;
