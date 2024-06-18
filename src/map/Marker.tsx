// @ts-ignore
import React, { memo, useState } from "react";
import { Button } from "./../Button";
import { IMarker } from "./../interfaces";
import { Marker as GoogleMapsMarker } from "@react-google-maps/api";
import { Modal } from "./../Modal";

function Marker(props: {
  markerGroup: IMarker[];
  onClick?: Function;
  onMouseOver: Function;
  onMouseOut: Function;
  onDragEnd: Function;
  hideTooltip: () => void;
}) {
  const { markerGroup } = props;

  const [showMultipleMarkersModal, setShowMultipleMarkersModal] =
    useState<boolean>(false);

  function onMarkerClicked(e: any, marker: IMarker) {
    if (marker.onClick) {
      marker.onClick(e, marker);
    }
    if (props.onClick) {
      props.onClick(e, marker);
    }
  }

  function renderMultipleMarkersModal() {
    return (
      showMultipleMarkersModal && (
        <Modal.Medium
          title="Multiple marker items"
          showCloseButton
          onHide={() => {
            setShowMultipleMarkersModal(false);
          }}
        >
          {markerGroup.map((marker, index: number) => {
            return (
              <div
                className={
                  marker.onClick
                    ? "cursor-pointer hover:bg-gray-100 rounded-md"
                    : ""
                }
                key={index}
                onClick={(e: any) => {
                  onMarkerClicked(e, marker);
                }}
              >
                {marker.options.tooltip &&
                  marker.options.tooltip(marker, props.hideTooltip, "modal")}
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
            // @ts-ignore
            props.onMouseOver(e, markerGroup);
          }}
          onMouseOut={(e: google.maps.MapMouseEvent) => {
            props.onMouseOut(e, markerGroup);
          }}
          options={{
            icon:
              markerGroup[0].options.svgMarker !== undefined
                ? markerGroup[0].options.svgMarker
                : window?.google?.maps
                ? // @ts-ignore
                  new window.google.maps.MarkerImage(
                    markerGroup[0].options.icon,
                    null,
                    null,
                    null,
                    new window.google.maps.Size(
                      markerGroup[0].options?.iconWidth ?? 0,
                      markerGroup[0].options?.iconHeight ?? 0
                    )
                  )
                : undefined,
          }}
        ></GoogleMapsMarker>

        {renderMultipleMarkersModal()}
      </>
    ) : (
      <></>
    );
  }

  return render();
}

export default memo(Marker);
