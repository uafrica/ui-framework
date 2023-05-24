import _ from "lodash";
import MapToolbar from "./MapToolbar";
import Marker from "./Marker";
import Polygon from "./Polygon";
import { Button } from "./../Button";
import { DrawingManager, GoogleMap, Polyline } from "@react-google-maps/api";
import { IMarker, IPolygon } from "./../interfaces";
import { useEffect, useState } from "react";
import * as mapUtils from "./../utils/mapUtils";

function Map(props: {
  readonly?: boolean;
  polygons?: IPolygon[];
  markers?: IMarker[];
  mapContainerStyle?: any;
  defaultCenter: { lat: number; lng: number };
  disableScrollZoom?: boolean;
  onPolygonClicked?: Function;
  onPolygonMouseOver?: Function;
  onPolygonMouseOut?: Function;
  onPolygonUpdated?: Function;
  onPolygonCreated?: Function;
  selectedPolygon?: IPolygon | null;
  onPolygonSelectionChanged?: Function;
  bounds?: google.maps.LatLngBounds;
  toolbarLeft?: any;
  toolbarMiddle?: any;
  toolbarRight?: any;
  editMode: "draw" | "select" | null;
  onEditModeChange?: Function;
  customToolbarButtons?: any[];
  defaultZoom?: number;
  onMapClick?: Function;
  mapOptions?: google.maps.MapOptions;
}) {
  let {
    polygons,
    markers,
    readonly,
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
    mapOptions
  } = props;
  const snapDistanceThreshold = 30;

  let [map, setMap] = useState<any>();
  let [doSnap, setDoSnap] = useState<boolean>(false);
  let [center, setCenter] = useState(defaultCenter);
  let [isMapLoaded, setIsMapLoaded] = useState(false);
  let [options, setOptions] = useState({});

  useEffect(() => {
    if (bounds && isMapLoaded) {
      map.fitBounds(bounds);
    }
  }, [bounds]);

  useEffect(() => {
    if (!isMapLoaded && map !== undefined) {
      // map initial load
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
        strictBounds: true
      }
    };
    if (mapOptions) {
      options = { ...options, ...mapOptions };
    }

    setOptions({ ...options });
  }, [mapOptions]);

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
      // check if cursor was on polygon outline
      if (path !== undefined && (edge !== undefined || vertex !== undefined)) {
        let polygonPathContaingCoordinates = findPolygonPathContaingCoordinates(
          cursorLocation,
          polygon
        );

        if (polygonPathContaingCoordinates) {
          // node was moved to inside another polygon
          let closestPoint: any = findClosestPointInPath(
            cursorLocation,
            polygonPathContaingCoordinates
          );

          // replace the dragged point with the point to which it should snap
          if (closestPoint) {
            let polygonPathsAfterSnap = [...polygon.paths];
            if (edge !== undefined) {
              polygonPathsAfterSnap[path].splice(edge + 1, 0, {
                lat: closestPoint.lat(),
                lng: closestPoint.lng()
              });
              polygonPathsAfterSnap[path].splice(edge + 2, 1);
            } else if (vertex !== undefined) {
              polygonPathsAfterSnap[path][vertex] = {
                lat: closestPoint.lat(),
                lng: closestPoint.lng()
              };
            }

            polygonPathsAfterSnap[path] = removeDuplicateLatLngs(polygonPathsAfterSnap[path]);
            return [...polygonPathsAfterSnap];
          } else {
          }
        } else {
          // node was not moved to inside of another polygon
          let polygonPathsAfterNodeMove = [...polygon.paths];
          polygonPathsAfterNodeMove[path] = removeDuplicateLatLngs(polygonPathsAfterNodeMove[path]);
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
      let distance = google.maps.geometry.spherical.computeDistanceBetween(latLng, cursorLocation);

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
    // obtained from https://www.programmersought.com/article/88374418694/
    var pointA = map.getCenter();
    var pointAPixel = latLngToPixel(pointA);
    var pointB = new google.maps.LatLng(pointA.lat() + 0.01, pointA.lng());
    var pointBPixel = latLngToPixel(pointB);
    var pixelDistanceBetweenPoints = Math.abs(pointBPixel.y - pointAPixel.y);
    var realDistanceBetweenPoints = google.maps.geometry.spherical.computeDistanceBetween(
      pointA,
      pointB
    );
    var pixelDistance = realDistance / (realDistanceBetweenPoints / pixelDistanceBetweenPoints);
    return pixelDistance;
  }

  function latLngToPixel(latLng: google.maps.LatLng) {
    var scale = Math.pow(2, map.getZoom());
    var projection = map.getProjection();
    var bounds = map.getBounds();
    var nw = projection.fromLatLngToPoint(
      new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng())
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
              let googleLatLngPath: any = []; // required for google polygon
              path.forEach((latLng: any) => {
                googleLatLngPath.push(new google.maps.LatLng(latLng.lat, latLng.lng));
              });

              if (
                google.maps.geometry.poly.containsLocation(
                  cursorLocation,
                  new google.maps.Polygon({
                    // @ts-ignore
                    path: googleLatLngPath
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

  function refitBoundsOfMap(map: any, markers: any[], polygons: IPolygon[], padding: any) {
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

  function renderAntimeridian() {
    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 4
    };
    let antimeridian = {
      path: [
        { lat: 90, lng: 180 },
        { lat: -90, lng: 180 }
      ],

      options: {
        strokeColor: "red",
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "20px"
          }
        ]
      }
    };

    return <Polyline path={antimeridian.path} options={antimeridian.options} />;
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
              !readonly &&
              selectedPolygon !== null &&
              selectedPolygon?.data?.id === polygon?.data?.id
            }
            polygon={polygon}
            key={index}
            zIndex={index}
            onClick={(e: google.maps.PolyMouseEvent, polygon: IPolygon) => {
              if (props.onPolygonSelectionChanged) {
                props.onPolygonSelectionChanged(polygon, true);
                refitBounds(polygon);

                if (!readonly) {
                  enterEditMode();
                }
                if (props.onPolygonClicked) {
                  props.onPolygonClicked(e, polygon);
                }
              }
            }}
            onMouseOver={(e: google.maps.PolyMouseEvent, polygon: IPolygon) => {
              if (props.onPolygonMouseOver) {
                props.onPolygonMouseOver(e, polygon);
              }
            }}
            onMouseOut={(e: google.maps.PolyMouseEvent, polygon: IPolygon) => {
              if (props.onPolygonMouseOut) {
                props.onPolygonMouseOut(e, polygon);
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

  function renderMarkers() {
    let markersGrouped: any = {};

    if (markers) {
      markersGrouped = _.groupBy(
        markers,
        marker => marker.coordinates.lat + ", " + marker.coordinates.lng
      );
    }

    return Object.keys(markersGrouped).map(key => {
      let markerGroup = markersGrouped[key];

      return (
        <Marker
          key={key}
          markerGroup={markerGroup}
          onMouseOver={() => {}}
          onMouseOut={() => {}}
          onDragEnd={(e: google.maps.MapMouseEvent, marker: IMarker) => {
            if (markerGroup[0].onDragEnd) {
              markerGroup[0].onDragEnd(e, marker);
            }
          }}
        />
      );
    });
  }

  function render() {
    return (
      <div className="relative">
        <div className="absolute z-50 flex flex-row space-x-4 justify-between w-full p-4 items-center">
          <div className="flex flex-row space-x-4 items-center">
            {toolbarLeft && <div>{toolbarLeft}</div>}

            {!readonly && editMode && (
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
              !readonly && (
                <Button.Primary
                  title="Edit zones"
                  id="edit_zones"
                  className="edit-button"
                  onClick={() => {
                    enterEditMode();
                  }}
                />
              )
            )}
          </div>
        </div>
        <GoogleMap
          id="bob_map"
          mapContainerStyle={mapContainerStyle ?? {}}
          center={center}
          zoom={defaultZoom ?? 5}
          onLoad={map => {
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
                  options: {}
                };

                if (doSnap) {
                  paths.forEach((path: any, pathIndex: number) => {
                    path.forEach(
                      (coordinates: { lat: number; lng: number }, vertexIndex: number) => {
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
                drawingControl: false
              }}
            />
          )}

          {renderPolygons()}
          {renderMarkers()}
          {renderAntimeridian()}
        </GoogleMap>
      </div>
    );
  }

  return render();
}

export { Map };
