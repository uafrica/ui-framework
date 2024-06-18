// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Layer, Map } from "leaflet";
import {
  IOpenStreetMapMarker,
  IPolygon,
  IPolyline,
  ICircle,
} from "../interfaces";
import * as generalUtils from "../utils/generalUtils";
import { GestureHandling } from "leaflet-gesture-handling";

import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

function OpenStreetMap(props: {
  polygons?: IPolygon[];
  circles?: ICircle[];
  polylines?: IPolyline[];
  markers?: IOpenStreetMapMarker[];
  mapContainerStyle?: any;
  defaultCenter: { lat: number; lng: number };
  bounds?: google.maps.LatLngBounds | L.LatLngBounds;
  defaultZoom?: number;
}) {
  const {
    defaultCenter,
    defaultZoom,
    polygons,
    markers,
    polylines,
    circles,
    bounds,
    mapContainerStyle,
  } = props;
  const mapId = `map_${generalUtils.generateRandomString(10)}`;
  const [map, setMap] = useState<Map>();
  const [polygonLayer, setPolygonLayer] = useState<Layer>();
  const [markerLayer, setMarkerLayer] = useState<Layer>();
  const [polylineLayer, setPolylineLayer] = useState<Layer>();
  const [circleLayer, setCircleLayer] = useState<Layer>();
  const [antimeridianLayer, setAntimeridianLayer] = useState<Layer>();
  const mapRef = useRef<any>();

  const antimeridian: IPolyline = {
    data: { id: "antimeridian" },
    path: [
      { lat: 90, lng: 180 },
      { lat: -90, lng: 180 },
    ],

    options: {
      strokeColor: "red",
      strokeOpacity: 0,
    },
  };

  useEffect(() => {
    if (!mapRef.current) {
      L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
      setMap((map) => {
        map = L.map(mapId, {
          center: [
            defaultCenter.lat ?? -29.2706264,
            defaultCenter.lng ?? 22.9551257,
          ],
          zoom: defaultZoom ?? 5,
          // @ts-ignore
          gestureHandling: true,
        });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        mapRef.current = map;
        return map;
      });
    }
  }, []);

  useEffect(() => {
    if (map) {
      map.setView(
        new L.LatLng(defaultCenter.lat, defaultCenter.lng),
        defaultZoom
      );

      if (bounds) {
        if ("isValid" in bounds) {
          // Leaflet bounds
          map.fitBounds(bounds);
        } else {
          // Google maps bounds
          let northEast = L.latLng(
            bounds?.getNorthEast().lat(),
            bounds?.getNorthEast().lng()
          );
          let southWest = L.latLng(
            bounds?.getSouthWest().lat(),
            bounds?.getSouthWest().lng()
          );
          map.fitBounds(new L.LatLngBounds(northEast, southWest));
        }
      }
    }
  }, [defaultCenter, bounds, map]);

  useEffect(() => {
    if (map) {
      addAntimeridianToMap();
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      addPolygonsToMap();
    }
  }, [polygons, map]);

  useEffect(() => {
    if (map) {
      addMarkersToMap();
    }
  }, [markers, map]);

  useEffect(() => {
    if (map) {
      addPolylinesToMap();
    }
  }, [polylines, map]);

  useEffect(() => {
    if (map) {
      addCirclesToMap();
    }
  }, [circles, map]);

  function addAntimeridianToMap() {
    if (map) {
      if (antimeridianLayer) {
        map?.removeLayer(antimeridianLayer);
      }
      setAntimeridianLayer((antimeridianLayer) => {
        antimeridianLayer = L.layerGroup([
          L.polyline(antimeridian.path, {
            color: antimeridian.options?.strokeColor,
            weight: antimeridian.options?.strokeWeight ?? 1,
          }),
        ]);

        antimeridianLayer.addTo(map);
        return antimeridianLayer;
      });
    }
  }

  function addPolylinesToMap() {
    if (map) {
      if (polylineLayer) {
        map?.removeLayer(polylineLayer);
      }
      setPolylineLayer((polylineLayer) => {
        polylineLayer = L.layerGroup(
          polylines?.map((polyline) => {
            return L.polyline(polyline.path, {
              color: polyline.options?.strokeColor ?? "black",
              weight: polyline.options?.strokeWeight ?? 1,
            });
          })
        );

        polylineLayer.addTo(map);
        return polylineLayer;
      });
    }
  }

  function addCirclesToMap() {
    if (map) {
      if (circleLayer) {
        map?.removeLayer(circleLayer);
      }
      setCircleLayer((circleLayer) => {
        circleLayer = L.layerGroup(
          circles?.map((circle) => {
            return L.circle(
              { lat: circle.center.lat, lng: circle.center.lng },
              {
                radius: circle.radius,
                color: circle.options.strokeColor,
                weight: circle.options.strokeWeight,
                opacity: circle.options.strokeOpacity,
                fillColor: circle.options.fillColor,
                fillOpacity: circle.options.fillOpacity,
              }
            ).addEventListener("click", (e: any) => {
              circle.onClick && circle.onClick(e, circle);
            });
          })
        );

        circleLayer.addTo(map);
        return circleLayer;
      });
    }
  }

  function addPolygonsToMap() {
    if (map) {
      if (polygonLayer) {
        map?.removeLayer(polygonLayer);
      }
      setPolygonLayer((polygonLayer) => {
        polygonLayer = L.layerGroup(
          polygons?.map((polygon) => {
            let polygonObject = L.polygon(polygon.paths, {
              color: polygon.options.strokeColor,
              opacity: polygon.options.strokeOpacity,
              weight: polygon.options.strokeWeight,
              fillColor: polygon.options.fillColor,
              fillOpacity: polygon.options.fillOpacity,
            }).addEventListener("click", (e: any) => {
              polygon.onClick && polygon.onClick(e, polygon);
            });

            return polygonObject;
          })
        );
        polygonLayer.addTo(map);
        return polygonLayer;
      });
    }
  }

  function addMarkersToMap() {
    if (map) {
      if (markerLayer) {
        map?.removeLayer(markerLayer);
      }
      setMarkerLayer((markerLayer) => {
        markerLayer = L.layerGroup(
          markers?.map((marker) => {
            let iconWidth = marker.options.iconWidth ?? 20;
            let iconHeight = marker.options.iconHeight ?? 20;

            let markerObject = L.marker(
              {
                lat: marker.coordinates.lat,
                lng: marker.coordinates.lng,
              },
              {
                icon: L.icon({
                  iconUrl: marker.options.icon ?? "",
                  iconSize: [iconWidth, iconHeight],
                  iconAnchor: [iconWidth / 2, iconHeight], // Middle bottom
                }),
              }
            ).addEventListener("click", (e: any) => {
              marker.onClick && marker.onClick(e, marker);
            });

            if (marker.options.tooltip) {
              markerObject
                .bindTooltip(marker.options.tooltip, {
                  opacity: 1,
                  direction: "top",
                  offset: new L.Point(
                    marker?.options?.tooltipPixelOffset?.x ?? 0,
                    marker?.options?.tooltipPixelOffset?.y ?? 0
                  ),
                })
                .openTooltip();
            }

            return markerObject;
          })
        );
        markerLayer.addTo(map);
        return markerLayer;
      });
    }
  }

  /* -------------------------------- */
  /* RENDER METHODS */
  /* -------------------------------- */

  function render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></script>
        <div id={mapId} style={mapContainerStyle}></div>
      </div>
    );
  }

  return render();
}
export { OpenStreetMap };
