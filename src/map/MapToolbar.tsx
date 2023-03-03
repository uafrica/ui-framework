import { Button } from "./../Button";

function MapToolbar(props: {
  editMode: "draw" | "select" | null;
  onSelectModeClicked: Function;
  onDrawModeClicked: Function;
  doSnap: boolean;
  onSnapToggle: Function;
  customToolbarButtons?: any[];
}) {
  let { editMode, doSnap, customToolbarButtons } = props;

  if (!editMode) return null;

  return (
    <div className="flex flex-row space-x-4">
      <Button.Tertiary
        hoverTitle="Select tool"
        icon="mouse-pointer"
        id="mouse_pointer"
        className={editMode === "select" ? "ring-2 ring-blue" : ""}
        onClick={props.onSelectModeClicked}
      />

      <Button.Tertiary
        hoverTitle="Draw tool"
        icon="draw-polygon"
        id="draw_tool"
        className={editMode === "draw" ? "ring-2 ring-blue" : ""}
        onClick={props.onDrawModeClicked}
      />

      <Button.Tertiary
        hoverTitle={doSnap ? "Disable polygon point snap" : "Enable polygon point snap"}
        icon="compress-arrows-alt"
        className={doSnap ? "ring-2 ring-blue" : ""}
        onClick={() => {
          props.onSnapToggle();
        }}
      />

      {customToolbarButtons &&
        customToolbarButtons.map(button => {
          return button;
        })}
    </div>
  );
}

export default MapToolbar;
