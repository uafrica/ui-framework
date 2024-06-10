import * as generalUtils from "../utils/generalUtils";
import * as mapUtils from "../utils/mapUtils";
import MapToolbar from "./MapToolbar";
import Marker from "./Marker";
import Polygon from "./Polygon";
import Polyline from "./Polyline";
import { Button } from "../Button";
import {
  Circle,
  DrawingManager,
  GoogleMap,
  InfoWindow,
} from "@react-google-maps/api";
import { IMarker, IPolygon, IPolyline } from "../interfaces";
import { defaultMapStyles } from "../utils/constantsAndDefaults";
import { ICircle } from "../interfaces/map/circle.interface";
// @ts-ignore
import React, { useEffect, useMemo, useState } from "react";
import groupBy from "lodash/groupBy";

function Map(props: {
  isReadOnly?: boolean;
  polygons?: IPolygon[];
  circles?: ICircle[];
  polylines?: IPolyline[];
  markers?: IMarker[];
  mapContainerStyle?: any;
  defaultCenter: { lat: number; lng: number };
  disableScrollZoom?: boolean;
  onPolygonClicked?: (e: google.maps.PolyMouseEvent, polygon: IPolygon) => void;
  onPolygonMouseOver?: (
    e: google.maps.PolyMouseEvent,
    polygon: IPolygon
  ) => void;
  onPolygonMouseOut?: (
    e: google.maps.PolyMouseEvent,
    polygon: IPolygon
  ) => void;
  onPolygonUpdated?: (polygon: IPolygon) => void;
  onPolygonCreated?: (polygon: IPolygon) => void;
  selectedPolygon?: IPolygon | null;
  onPolygonSelectionChanged?: (
    polygon: IPolygon,
    refitBounds?: boolean
  ) => void;
  bounds?: google.maps.LatLngBounds;
  toolbarLeft?: any;
  toolbarMiddle?: any;
  toolbarRight?: any;
  editMode: "draw" | "select" | null | undefined;
  onEditModeChange?: (mode?: "select" | "draw" | null | undefined) => void;
  customToolbarButtons?: any[];
  defaultZoom?: number;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  mapOptions?: google.maps.MapOptions;
  onEditZonesClicked?: (mode?: "select" | "draw" | null | undefined) => void;
}) {
  const {
    polygons,
    polylines,
    circles,
    markers,
    isReadOnly,
    disableScrollZoom,
    selectedPolygon,
    bounds,
    defaultCenter,
    mapContainerStyle,
    toolbarLeft,
    toolbarMiddle,
    toolbarRight,
    editMode,
    customToolbarButtons,
    defaultZoom,
    mapOptions,
  } = props;

  const snapDistanceThreshold = 30;

  const [map, setMap] = useState<any>();
  const [mapId, setMapId] = useState<string>("");
  const [doSnap, setDoSnap] = useState<boolean>(false);
  const [center, setCenter] = useState({ ...defaultCenter });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [options, setOptions] = useState({});
  const [markerTooltipContent, setMarkerTooltipContent] = useState<any>(null);
  const [polygonTooltipContent, setPolygonTooltipContent] = useState<any>(null);
  const [tooltipMode, setTooltipMode] = useState<"click" | "hover">("click");
  const [tooltipCoordinates, setTooltipCoordinates] = useState<any>();
  const [tooltipPixelOffset, setTooltipPixelOffset] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function updateMarkerTooltip(
    tooltipContent: any,
    tooltipPixelOffset?: { x: number; y: number }
  ) {
    setMarkerTooltipContent(tooltipContent);
    if (tooltipPixelOffset) {
      setTooltipPixelOffset({ ...tooltipPixelOffset });
    } else {
      setTooltipPixelOffset({ x: 100, y: 100 });
    }
  }

  function updatePolygonTooltip(
    tooltipContent: any,
    tooltipPixelOffset?: { x: number; y: number }
  ) {
    setPolygonTooltipContent(tooltipContent);
    if (tooltipPixelOffset) {
      setTooltipPixelOffset({ ...tooltipPixelOffset });
    } else {
      setTooltipPixelOffset(null);
    }
  }

  const renderMarkersWithMemo = useMemo(
    () => renderMarkers(),
    [markers, map, tooltipCoordinates, markerTooltipContent]
  );
  const renderCirclesWithMemo = useMemo(
    () => renderCircles(),
    [circles, map, tooltipCoordinates]
  );
  const renderPolylinesWithMemo = useMemo(
    () => renderPolylines(),
    [polylines, map, tooltipCoordinates]
  );
  const renderPolygonsWithMemo = useMemo(
    () => renderPolygons(),
    [polygons, selectedPolygon, doSnap, isReadOnly, map, tooltipCoordinates]
  );
  const renderAntimeridianWithMemo = useMemo(() => renderAntimeridian(), []);
  const renderTooltipWithMemo = useMemo(
    () => renderTooltip(),
    [
      tooltipCoordinates,
      markerTooltipContent,
      polygonTooltipContent,
      map,
      markers,
    ]
  );
  const renderMapWithMemo = useMemo(
    () => renderMap(),
    [
      markers,
      polygons,
      polylines,
      circles,
      editMode,
      map,
      tooltipCoordinates,
      polygonTooltipContent,
      markerTooltipContent,
    ]
  );

  useEffect(() => {
    let mapId = `map_${generalUtils.generateRandomString(10)}`;
    setMapId(mapId);
  }, []);

  useEffect(() => {
    if (bounds && isMapLoaded) {
      map.fitBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    if (!isMapLoaded && map !== undefined) {
      // Map initial load
      setIsMapLoaded(true);
      if (bounds) {
        map.fitBounds(bounds);
      }
    }
  }, [map]);

  useEffect(() => {
    let options: google.maps.MapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: disableScrollZoom ? "cooperative" : "greedy",
      restriction: {
        latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
        strictBounds: true,
      },
    };

    if (mapOptions) {
      options = { ...options, ...mapOptions };
    }

    if (!options.styles) {
      options.styles = [];
    }

    options.styles = mergeMapStyles(defaultMapStyles, options.styles);

    setOptions({ ...options });
  }, [mapOptions]);

  // Merges two map styles arrays, giving preference to the first array
  function mergeMapStyles(
    preferredArray: google.maps.MapTypeStyle[],
    otherArray: google.maps.MapTypeStyle[]
  ): google.maps.MapTypeStyle[] {
    const mergedArray: google.maps.MapTypeStyle[] = [...preferredArray];

    otherArray.forEach((otherItem) => {
      const existingItem = mergedArray.find(
        (item) =>
          item.featureType === otherItem.featureType &&
          item.elementType === otherItem.elementType
      );
      if (!existingItem) {
        mergedArray.push(otherItem);
      }
    });

    return mergedArray;
  }

  function enterEditMode(mode?: "select" | "draw") {
    if (props.onEditModeChange) {
      props.onEditModeChange(mode ?? "select");
    }
  }

  function exitEditMode() {
    if (props.onEditModeChange) {
      props.onEditModeChange(null);
    }
  }

  function snapPointToPolygon(
    e: google.maps.PolyMouseEvent,
    polygon: IPolygon,
    cursorLocation: google.maps.LatLng
  ) {
    if (polygons) {
      let { edge, vertex, path } = e;
      // Check if cursor was on polygon outline
      if (path !== undefined && (edge !== undefined || vertex !== undefined)) {
        let polygonPathContaingCoordinates = findPolygonPathContaingCoordinates(
          cursorLocation,
          polygon
        );

        if (polygonPathContaingCoordinates) {
          // Node was moved to inside another polygon
          let closestPoint: any = findClosestPointInPath(
            cursorLocation,
            polygonPathContaingCoordinates
          );

          // Replace the dragged point with the point to which it should snap
          if (closestPoint) {
            let polygonPathsAfterSnap = [...polygon.paths];
            if (edge !== undefined) {
              polygonPathsAfterSnap[path].splice(edge + 1, 0, {
                lat: closestPoint.lat(),
                lng: closestPoint.lng(),
              });
              polygonPathsAfterSnap[path].splice(edge + 2, 1);
            } else if (vertex !== undefined) {
              polygonPathsAfterSnap[path][vertex] = {
                lat: closestPoint.lat(),
                lng: closestPoint.lng(),
              };
            }

            polygonPathsAfterSnap[path] = removeDuplicateLatLngs(
              polygonPathsAfterSnap[path]
            );
            return [...polygonPathsAfterSnap];
          }
        } else {
          // Node was not moved to inside of another polygon
          let polygonPathsAfterNodeMove = [...polygon.paths];
          polygonPathsAfterNodeMove[path] = removeDuplicateLatLngs(
            polygonPathsAfterNodeMove[path]
          );
          return [...polygonPathsAfterNodeMove];
        }
      } else {
        return [...polygon.paths];
      }
    }
    return [...polygon.paths];
  }

  function removeDuplicateLatLngs(path: { lat: any; lng: any }[]) {
    for (let i = path.length - 2; i >= 0; i--) {
      if (path[i].lat === path[i + 1].lat && path[i].lng === path[i + 1].lng) {
        path.splice(i + 1, 1);
      }
    }
    return path;
  }

  function findClosestPointInPath(
    cursorLocation: google.maps.LatLng,
    path: google.maps.LatLng[]
  ): google.maps.LatLng | null {
    let closestPoint = null;
    let closestPointDistance: any = null;
    path.forEach((latLng: google.maps.LatLng) => {
      let distance = google.maps.geometry.spherical.computeDistanceBetween(
        latLng,
        cursorLocation
      );

      if (closestPointDistance === null || distance < closestPointDistance) {
        closestPointDistance = distance;
        closestPoint = latLng;
      }
    });

    let pixelDistance = getPixelDistanceByRealDistance(closestPointDistance);
    if (pixelDistance < snapDistanceThreshold) {
      return closestPoint;
    } else {
      return null;
    }
  }

  function getPixelDistanceByRealDistance(realDistance: number) {
    // Obtained from https://www.programmersought.com/article/88374418694/
    var pointA = map.getCenter();
    var pointAPixel = latLngToPixel(pointA);
    var pointB = new google.maps.LatLng(pointA.lat() + 0.01, pointA.lng());
    var pointBPixel = latLngToPixel(pointB);
    var pixelDistanceBetweenPoints = Math.abs(pointBPixel.y - pointAPixel.y);
    var realDistanceBetweenPoints =
      google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
    var pixelDistance =
      realDistance / (realDistanceBetweenPoints / pixelDistanceBetweenPoints);
    return pixelDistance;
  }

  function latLngToPixel(latLng: google.maps.LatLng) {
    var scale = Math.pow(2, map.getZoom());
    var projection = map.getProjection();
    var bounds: google.maps.LatLngBounds = map.getBounds();
    var nw = projection.fromLatLngToPoint(
      new google.maps.LatLng(
        bounds.getNorthEast().lat(),
        bounds.getSouthWest().lng()
      )
    );
    var point = projection.fromLatLngToPoint(latLng);
    return new google.maps.Point(
      Math.floor((point.x - nw.x) * scale),
      Math.floor((point.y - nw.y) * scale)
    );
  }

  function findPolygonPathContaingCoordinates(
    cursorLocation: google.maps.LatLng,
    selectedPolygon: IPolygon
  ) {
    if (polygons) {
      for (let polygon of polygons) {
        if (polygon?.id !== selectedPolygon?.id) {
          if (polygon.paths) {
            for (let path of polygon.paths) {
              let googleLatLngPath: any = []; // Required for google polygon
              path.forEach((latLng: any) => {
                googleLatLngPath.push(
                  new google.maps.LatLng(latLng.lat, latLng.lng)
                );
              });

              if (
                google.maps.geometry.poly.containsLocation(
                  cursorLocation,
                  new google.maps.Polygon({
                    // @ts-ignore
                    path: googleLatLngPath,
                  })
                )
              ) {
                return googleLatLngPath;
              }
            }
          }
        }
      }
    }
  }

  function refitBounds(selectedPolygon?: IPolygon) {
    if (selectedPolygon) {
      refitBoundsOfMap(map, [], [], [selectedPolygon]);
    }
  }

  function refitBoundsOfMap(
    map: any,
    markers: any[],
    polygons: IPolygon[],
    padding: any
  ) {
    try {
      var bounds = new window.google.maps.LatLngBounds();
      var boundsExtended = false;

      markers.forEach((marker: IMarker) => {
        bounds.extend(marker.coordinates);
        boundsExtended = true;
      });

      polygons.forEach((polygon: IPolygon) => {
        if (polygon.paths) {
          polygon.paths.forEach((path: any) => {
            path.forEach((coord: { lng: number; lat: number }) => {
              bounds.extend(coord);
              boundsExtended = true;
            });
          });
        }
      });

      let _padding = { top: 50, right: 50, left: 50, bottom: 50 };
      if (padding) {
        _padding = padding;
      }

      if (boundsExtended) {
        map.fitBounds(bounds, _padding);
        setCenter({ lat: map.center.lat(), lng: map.center.lng() });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function hideTooltip() {
    updateMarkerTooltip(null);
    updatePolygonTooltip(null);
  }

  function updateTooltipCoordinates(baseCoordinates: {
    lat?: number;
    lng?: number;
  }) {
    if (baseCoordinates.lat && baseCoordinates.lng && map) {
      let bounds: google.maps.LatLngBounds = map.getBounds();
      let northEast = bounds.getNorthEast();
      let southWest = bounds.getSouthWest();

      let latModifier = ((southWest.lat() - northEast.lat()) / 100) * 2;

      setTooltipCoordinates({
        lat: baseCoordinates.lat - latModifier,
        lng: baseCoordinates.lng,
      });
    }
  }

  function renderAntimeridian() {
    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 4,
    };
    let antimeridian: IPolyline = {
      data: { id: "antimeridian" },
      path: [
        { lat: 90, lng: 180 },
        { lat: -90, lng: 180 },
      ],

      options: {
        strokeColor: "red",
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "20px",
          },
        ],
      },
    };

    return <Polyline polyline={antimeridian} />;
  }

  function renderPolygons() {
    return (
      polygons &&
      polygons.map((polygon: IPolygon, index: number) => {
        return (
          <Polygon
            doSnap={doSnap}
            snapPointToPolygon={snapPointToPolygon}
            editable={
              !isReadOnly &&
              selectedPolygon !== null &&
              selectedPolygon?.data?.id === polygon?.data?.id
            }
            polygon={polygon}
            key={index}
            zIndex={index}
            onClick={(e: google.maps.PolyMouseEvent) => {
              if (props.onPolygonSelectionChanged) {
                props.onPolygonSelectionChanged(polygon, true);
                refitBounds(polygon);

                if (!isReadOnly) {
                  enterEditMode();
                }
                if (props.onPolygonClicked) {
                  props.onPolygonClicked(e, polygon);
                }
              }

              if (polygon.options.tooltipMode === "click") {
                let tooltipContent = polygon.options.tooltip
                  ? polygon.options.tooltip(polygon)
                  : null;
                updateTooltipCoordinates({
                  lat: e.latLng?.lat(),
                  lng: e.latLng?.lng(),
                });
                setTooltipMode("click");
                updatePolygonTooltip(
                  tooltipContent,
                  polygon.options.tooltipPixelOffset
                );
              }
            }}
            onMouseOver={(e: google.maps.PolyMouseEvent) => {
              if (props.onPolygonMouseOver) {
                props.onPolygonMouseOver(e, polygon);
              }
            }}
            onMouseMove={(e: google.maps.PolyMouseEvent) => {
              let tooltipContent = polygon.options.tooltip
                ? polygon.options.tooltip(polygon)
                : null;

              if (
                polygon.options.tooltipMode === "hover" ||
                !polygon.options.tooltipMode
              ) {
                updateTooltipCoordinates({
                  lat: e.latLng?.lat(),
                  lng: e.latLng?.lng(),
                });

                setTooltipMode("hover");
                updatePolygonTooltip(
                  tooltipContent,
                  polygon.options.tooltipPixelOffset
                );
              }
            }}
            onMouseOut={(e: google.maps.PolyMouseEvent, polygon: IPolygon) => {
              if (props.onPolygonMouseOut) {
                props.onPolygonMouseOut(e, polygon);
              }
              if (
                polygon.options.tooltipMode === "hover" ||
                !polygon.options.tooltipMode
              ) {
                updatePolygonTooltip(null);
              }
            }}
            onPolygonUpdated={(polygon: IPolygon) => {
              if (props.onPolygonUpdated) {
                props.onPolygonUpdated(polygon);
              }
            }}
          />
        );
      })
    );
  }
  function renderPolylines() {
    return (
      polylines &&
      polylines.map((polyline: IPolyline, index: number) => {
        return <Polyline polyline={polyline} key={index} />;
      })
    );
  }

  function renderCircles() {
    return (
      circles &&
      circles.map((circle: ICircle, index: number) => {
        return (
          <Circle
            radius={circle.radius}
            center={circle.center}
            options={circle.options}
            key={index}
          />
        );
      })
    );
  }

  function renderMarkers() {
    let markersGrouped: any = {};

    if (markers) {
      markersGrouped = groupBy(
        markers,
        (marker) => marker.coordinates.lat + ", " + marker.coordinates.lng
      );
    }

    return Object.keys(markersGrouped).map((key) => {
      let markerGroup = markersGrouped[key];

      return (
        <Marker
          hideTooltip={hideTooltip}
          key={key}
          markerGroup={markerGroup}
          onClick={() => {
            if (markerGroup[0].options.tooltipMode === "click") {
              let tooltipContent = markerGroup[0].options.tooltip
                ? markerGroup[0].options.tooltip(
                    markerGroup[0],
                    hideTooltip,
                    markerGroup.length === 1 ? "single" : "multiple"
                  )
                : null;
              updateTooltipCoordinates(markerGroup[0].coordinates);
              setTooltipMode("click");
              updateMarkerTooltip(
                tooltipContent,
                markerGroup[0].options?.tooltipPixelOffset
              );
            }
          }}
          onMouseOver={() => {
            if (
              markerGroup[0].options.tooltipMode === "hover" ||
              !markerGroup[0].options.tooltipMode
            ) {
              let tooltipContent = markerGroup[0].options.tooltip
                ? markerGroup[0].options.tooltip(
                    markerGroup[0],
                    hideTooltip,
                    markerGroup.length === 1 ? "single" : "multiple"
                  )
                : null;
              if (markerGroup.length > 1) {
                tooltipContent = (
                  <div className="px-4 py-2">
                    {markerGroup.length} marker items
                  </div>
                );
              }
              updateTooltipCoordinates({ ...markerGroup[0].coordinates });
              setTooltipMode("hover");

              updateMarkerTooltip(
                tooltipContent,
                markerGroup[0].options?.tooltipPixelOffset
              );
            }
          }}
          onMouseOut={() => {
            if (
              markerGroup[0].options.tooltipMode === "hover" ||
              !markerGroup[0].options.tooltipMode
            ) {
              updateMarkerTooltip(null);
            }
          }}
          onDragEnd={(e: google.maps.MapMouseEvent, marker: IMarker) => {
            if (markerGroup[0].onDragEnd) {
              markerGroup[0].onDragEnd(e, marker);
            }
          }}
        />
      );
    });
  }

  function renderTooltip() {
    return markerTooltipContent || polygonTooltipContent ? (
      <InfoWindow
        options={{
          disableAutoPan: tooltipMode !== "click",
          pixelOffset: tooltipPixelOffset
            ? new window.google.maps.Size(
                tooltipPixelOffset.x,
                tooltipPixelOffset.y
              )
            : undefined,
        }}
        children={
          <div className="map-tooltip">
            {markerTooltipContent || polygonTooltipContent}
          </div>
        }
        position={tooltipCoordinates}
        onCloseClick={hideTooltip}
      />
    ) : null;
  }

  function renderMap() {
    return (
      <GoogleMap
        id="bob_map"
        mapContainerStyle={mapContainerStyle ?? {}}
        center={center}
        zoom={defaultZoom ?? 5}
        onLoad={(map) => {
          setMap(map);
        }}
        options={options}
        onClick={(e: google.maps.MapMouseEvent) => {
          if (props.onMapClick) {
            props.onMapClick(e);
          }
        }}
      >
        {editMode === "draw" && (
          <DrawingManager
            onPolygonComplete={(polygon: google.maps.Polygon) => {
              enterEditMode("select");
              let paths = mapUtils.getPathFromGooglePolygon(polygon);

              let _polygon: IPolygon = {
                id: `new_polygon`,
                data: {},
                paths,
                options: {},
              };

              if (doSnap) {
                paths.forEach((path: any, pathIndex: number) => {
                  path.forEach(
                    (
                      coordinates: { lat: number; lng: number },
                      vertexIndex: number
                    ) => {
                      _polygon.paths = snapPointToPolygon(
                        // @ts-ignore
                        { path: pathIndex, vertex: vertexIndex },
                        _polygon,
                        new google.maps.LatLng(coordinates.lat, coordinates.lng)
                      );
                    }
                  );
                });
              }

              if (props.onPolygonCreated) {
                polygon.setVisible(false);
                props.onPolygonCreated(_polygon);
              }

              if (props.onPolygonSelectionChanged) {
                props.onPolygonSelectionChanged(_polygon, true);
              }
            }}
            drawingMode={window.google.maps.drawing.OverlayType.POLYGON}
            options={{
              drawingControl: false,
            }}
          />
        )}

        {renderPolygonsWithMemo}
        {renderPolylinesWithMemo}
        {renderCirclesWithMemo}
        {renderMarkersWithMemo}
        {renderAntimeridianWithMemo}
        {renderTooltipWithMemo}
      </GoogleMap>
    );
  }

  function render() {
    return mapId ? (
      <div className="relative" id={mapId}>
        <div className="absolute z-50 flex flex-row space-x-4 justify-between w-full p-4 items-center">
          <div className="flex flex-row space-x-4 items-center">
            {toolbarLeft && <div>{toolbarLeft}</div>}

            {!isReadOnly && editMode && (
              <MapToolbar
                doSnap={doSnap}
                onSnapToggle={() => {
                  setDoSnap(!doSnap);
                }}
                onSelectModeClicked={() => {
                  enterEditMode("select");
                }}
                onDrawModeClicked={() => {
                  enterEditMode("draw");
                }}
                editMode={editMode}
                customToolbarButtons={customToolbarButtons}
              />
            )}
          </div>
          {toolbarMiddle && <div>{toolbarMiddle}</div>}

          <div className="flex flex-row space-x-4 items-center">
            {toolbarRight && <div>{toolbarRight}</div>}

            {editMode ? (
              <Button.Danger
                id="exit_edit_mode"
                onClick={() => {
                  exitEditMode();
                }}
                title="Exit edit mode"
              />
            ) : (
              !isReadOnly && (
                <Button.Primary
                  title="Edit zones"
                  id="edit_zones"
                  className="edit-button"
                  onClick={() => {
                    if (props.onEditZonesClicked) {
                      props.onEditZonesClicked("select");
                    } else {
                      enterEditMode();
                    }
                  }}
                />
              )
            )}
          </div>
        </div>
        {renderMapWithMemo}
      </div>
    ) : null;
  }

  return render();
}

export { Map };
