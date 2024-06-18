// @ts-ignore
import React from "react";
import { Button } from "./../Button";

function MapToolbar(props: {
  editMode: "draw" | "select" | null;
  onSelectModeClicked: Function;
  onDrawModeClicked: Function;
  doSnap: boolean;
  onSnapToggle: Function;
  customToolbarButtons?: any[];
}) {
  const { editMode, doSnap, customToolbarButtons } = props;

  if (!editMode) return null;

  const snapIcon: any = doSnap ? "compress-arrows-alt" : "location-crosshairs";

  return (
    <div className="flex flex-row space-x-4">
      <Button.Tertiary
        hoverTitle="Select tool"
        icon="mouse-pointer"
        id="mouse_pointer"
        className={editMode === "select" ? "ring-2 ring-primary" : ""}
        onClick={(e: any) => {
          props.onSelectModeClicked(e);
        }}
      />

      <Button.Tertiary
        hoverTitle="Draw tool"
        icon="draw-polygon"
        id="draw_tool"
        className={editMode === "draw" ? "ring-2 ring-primary" : ""}
        onClick={(e: any) => {
          props.onDrawModeClicked(e);
        }}
      />

      <Button.Tertiary
        hoverTitle={
          doSnap ? "Disable polygon point snap" : "Enable polygon point snap"
        }
        icon={snapIcon}
        className={doSnap ? "ring-2 ring-primary" : ""}
        onClick={(e: any) => {
          props.onSnapToggle(e);
        }}
      />

      {customToolbarButtons &&
        customToolbarButtons.map((button) => {
          return button;
        })}
    </div>
  );
}

export default MapToolbar;
