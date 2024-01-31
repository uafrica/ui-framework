import * as mapUtils from "../utils/mapUtils";
// @ts-ignore
import React, { memo, useEffect, useState } from "react";
import { IPolygon } from "../interfaces/polygon.interface";
import { Polygon as GoogleMapsPolygon } from "@react-google-maps/api";
import { useStore } from "../store";

function Polygon(props: {
  polygon: IPolygon;
  zIndex: number;
  onClick?: Function;
  onMouseOver: Function;
  onMouseOut: Function;
  onMouseMove?: Function;
  editable: boolean;
  onPolygonUpdated: Function;
  snapPointToPolygon: Function;
  doSnap: boolean;
}) {
  let [polygonRef, setPolygonRef] = useState<any>();

  let store = useStore();

  let { polygon, zIndex, editable, doSnap } = props;

  let [options, setOptions] = useState<any>({ ...polygon.options } ?? {});

  useEffect(() => {
    setOptions({ ...polygon.options });
  }, [polygon]);

  function removeNodeFromPolygon(coordinates: google.maps.LatLng) {
    let paths = mapUtils.getPathFromGooglePolygon(polygonRef);
    let invalidRemoval = false;
    paths.forEach((path: { lat: number; lng: number }[], index) => {
      for (let i = path.length - 1; i >= 0; i--) {
        if (
          path[i]?.lat === coordinates.lat() &&
          path[i]?.lng === coordinates.lng()
        ) {
          let uniqueCoordinates = path.length;
          if (
            path[0].lat === path[path.length - 1].lat &&
            path[0].lng === path[path.length - 1].lng
          ) {
            // first and last coordinates can possibly be the same, polygon should have 3 pairs of *unique* coordinates
            uniqueCoordinates = uniqueCoordinates - 1;
          }
          if (uniqueCoordinates > 3) {
            path.splice(i, 1);
          } else if (uniqueCoordinates <= 3 && countNonEmptyPaths(paths) > 1) {
            for (let j = path.length - 1; j >= 0; j--) {
              path.splice(j, 1);
            }
          } else {
            invalidRemoval = true;
          }
        }
      }
      if (path.length === 0) {
        paths.splice(index, 1);
      }
    });
    if (invalidRemoval) {
      store.emitter.emit("showToast", {
        text: "This coordinate can not be removed from the polygon. A polygon must have at least 3 coordinates",
        variant: "error",
        autoHide: 3000,
      });
    } else {
      polygon.paths = [...paths];
      props.onPolygonUpdated(polygon);
    }
  }

  function countNonEmptyPaths(paths: any[]) {
    let count = 0;
    paths.forEach((path: any) => {
      if (path.length > 0) {
        count++;
      }
    });
    return count;
  }

  function render() {
    return (
      <>
        <GoogleMapsPolygon
          onLoad={(ref) => {
            if (ref && polygon) {
              setPolygonRef(ref);
            }
          }}
          editable={
            editable &&
            (polygon?.options?.isEditable
              ? polygon.options.isEditable(polygon)
              : true)
          }
          onClick={(e: google.maps.PolyMouseEvent) => {
            if (props.onClick) {
              props.onClick(e, polygon);
            }
            if (polygon.onClick) {
              polygon.onClick(e, polygon);
            }
          }}
          paths={polygon.paths}
          options={{
            ...options,
            zIndex,
          }}
          onMouseOver={(e: google.maps.PolyMouseEvent) => {
            setOptions((options: any) => {
              return {
                ...options,
                fillOpacity: polygon.options.fillOpacity
                  ? polygon.options.fillOpacity + 0.2
                  : 0.6,
              };
            });
            props.onMouseOver(e, polygon);
          }}
          onMouseOut={(e: google.maps.PolyMouseEvent) => {
            setOptions((options: any) => {
              return {
                ...options,
                fillOpacity: polygon.options.fillOpacity ?? 0.2,
              };
            });

            props.onMouseOut(e, polygon);
          }}
          onRightClick={(e: google.maps.PolyMouseEvent) => {
            // remove node if more than 3 nodes
            if (e.vertex !== null && e.vertex !== undefined) {
              if (e.latLng) {
                removeNodeFromPolygon(e.latLng);
              }
            } else {
              // not a node that can be removed
            }
          }}
          onMouseUp={(e: google.maps.PolyMouseEvent) => {
            let newPolygonPaths = mapUtils.getPathFromGooglePolygon(polygonRef);
            let cursorLocation: any = e.latLng;
            if (
              e.path !== undefined &&
              (e.edge !== undefined || e.vertex !== undefined)
            ) {
              let index: any = e?.edge !== undefined ? e.edge + 1 : e.vertex;
              cursorLocation = new google.maps.LatLng(
                newPolygonPaths[e.path][index].lat,
                newPolygonPaths[e.path][index].lng
              );
              // @ts-ignore
              if (e.domEvent.button !== 2) {
                // not when right clicking
                if (e?.vertex !== undefined || e?.edge !== undefined) {
                  // do snapping if enabled

                  if (doSnap) {
                    props.onPolygonUpdated({
                      ...polygon,
                      paths: props.snapPointToPolygon(
                        e,
                        { ...polygon, paths: newPolygonPaths },
                        cursorLocation
                      ),
                    });
                  } else {
                    props.onPolygonUpdated({
                      ...polygon,
                      paths: newPolygonPaths,
                    });
                  }
                }
              }
            }
          }}
          onMouseMove={(e: google.maps.PolyMouseEvent) => {
            if (props.onMouseMove) {
              props.onMouseMove(e, polygon);
            }
          }}
        />
      </>
    );
  }
  return render();
}

export default memo(Polygon);
