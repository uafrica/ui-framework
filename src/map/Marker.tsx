import Tooltip from "./Tooltip";
import { IMarker } from "./../interfaces";
import { Marker as GoogleMapsMarker } from "@react-google-maps/api";
import { useState } from "react";
import { Modal } from "./../Modal";
import { Button } from "./../Button";

function Marker(props: {
  markerGroup: IMarker[];
  onClick?: Function;
  onMouseOver: Function;
  onMouseOut: Function;
  onDragEnd: Function;
}) {
  let { markerGroup } = props;

  let [isHovering, setIsHovering] = useState<boolean>(false);
  let [showMultipleMarkersModal, setShowMultipleMarkersModal] = useState<boolean>(false);

  function onMarkerClicked(e: any, marker: IMarker) {
    if (marker.onClick) {
      marker.onClick(e, marker);
    }
  }

  function renderMultipleMarkersModal() {
    return (
      showMultipleMarkersModal && (
        <Modal.Medium
          title="Multiple marker items"
          show={true}
          closeButton
          onHide={() => {
            setShowMultipleMarkersModal(false);
          }}
        >
          {markerGroup.map((marker, index: number) => {
            return (
              <div
                className={marker.onClick ? "cursor-pointer hover:bg-gray-100 rounded-md" : ""}
                key={index}
                onClick={(e: any) => {
                  onMarkerClicked(e, marker);
                }}
              >
                {marker.options.tooltip && marker.options.tooltip(marker)}
              </div>
            );
          })}
          <Modal.ButtonsPanel>
            <Button.Cancel
              onClick={() => {
                setShowMultipleMarkersModal(false);
              }}
            />
          </Modal.ButtonsPanel>
        </Modal.Medium>
      )
    );
  }

  function render() {
    let coordinates = markerGroup[0].coordinates;
    let tooltipContent = markerGroup[0].options.tooltip
      ? markerGroup[0].options.tooltip(markerGroup[0])
      : null;
    if (markerGroup.length > 1) {
      tooltipContent = <div className="px-4 py-2">{markerGroup.length} marker items</div>;
    }

    return markerGroup.length > 0 ? (
      <>
        <GoogleMapsMarker
          draggable={markerGroup[0]?.options?.isDraggable}
          onDragEnd={(e: google.maps.MapMouseEvent) => {
            props.onDragEnd(e, markerGroup[0]);
          }}
          onClick={(e: google.maps.MapMouseEvent) => {
            if (markerGroup.length === 1) {
              onMarkerClicked(e, markerGroup[0]);
            } else {
              setShowMultipleMarkersModal(true);
            }
          }}
          position={coordinates}
          onMouseOver={(e: google.maps.MapMouseEvent) => {
            setIsHovering(true);
            props.onMouseOver(e, markerGroup);
          }}
          onMouseOut={(e: google.maps.MapMouseEvent) => {
            setIsHovering(false);
            props.onMouseOut(e, markerGroup);
          }}
          options={{
            icon: window?.google?.maps
              ? // @ts-ignore
                new window.google.maps.MarkerImage(
                  markerGroup[0].options.icon,
                  null,
                  null,
                  null,
                  new window.google.maps.Size(
                    markerGroup[0].options.iconWidth,
                    markerGroup[0].options.iconHeight
                  )
                )
              : undefined
          }}
        ></GoogleMapsMarker>
        {isHovering && (
          <Tooltip
            offsetY={markerGroup[0].options.tooltipYOffset}
            offsetX={markerGroup[0].options.tooltipXOffset}
            tooltipContent={tooltipContent}
          />
        )}
        {renderMultipleMarkersModal()}
      </>
    ) : (
      <></>
    );
  }

  return render();
}

export default Marker;
