const polygonOptions = {
  fillOpacity: 0.5,
  strokeOpacity: 0.8,
  strokeWeight: 2,
  editable: false
};

const polygonOptionsFaded = {
  fillOpacity: 0.2,
  strokeOpacity: 0.5,
  strokeWeight: 2,
  editable: false,
  somethingChanged: false
};

function loadGoogleMaps(store: any, scriptSrc: string) {
  let script: any = document.getElementById("googleMapsScript");
  if (!script) {
    script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    script.id = "googleMapsScript";

    script.onload = () => {
      store.set("isGoogleMapsLoaded", true);
    };

    document.body.append(script);
  }
  return script;
}

function getGeometryJSONFromPath(path: any) {
  let arrayPath = path.map((pathPart: any) => {
    return pathPart.map((coordinates: any) => {
      if (coordinates.lat && coordinates.lng) {
        return [coordinates.lng, coordinates.lat];
      } else {
        return coordinates;
      }
    });
  });
  return { type: "MultiPolygon", coordinates: [arrayPath] };
}

function getPathFromGeometryJSON(objectWithGeometryJSON: string) {
  let geometryJSON: { type: string; coordinates: any[] } = objectWithGeometryJSON
    ? JSON.parse(objectWithGeometryJSON)
    : {};

  // convert polygons to multi-polygons
  if (geometryJSON.type === "Polygon") {
    geometryJSON.coordinates = [geometryJSON.coordinates];
    geometryJSON.type = "MultiPolygon";
  }

  let path: any[] = [];

  if (geometryJSON && geometryJSON.coordinates) {
    geometryJSON.coordinates.forEach((pathThingy: any[]) => {
      pathThingy.forEach((polygon: any[]) => {
        let polygonPoints: any[] = [];
        path.push(polygonPoints);

        // Multi polygon
        polygon.forEach(coordinate => {
          polygonPoints.push({
            lng: coordinate[0],
            lat: coordinate[1]
          });
        });
      });
    });
  }

  return path;
}

function pointWithPaddedBounds(lat_lng: any) {
  try {
    var bounds = new window.google.maps.LatLngBounds();
    var topLeft = { lat: lat_lng.lat() - 0.01, lng: lat_lng.lng() - 0.01 };
    var bottomRight = { lat: lat_lng.lat() + 0.01, lng: lat_lng.lng() + 0.01 };
    bounds.extend(topLeft);
    bounds.extend(bottomRight);
    return bounds;
  } catch (e) {
    console.log(e);
    return null;
  }
}

function refitBoundsOfMap(
  map: any,
  markers: any[],
  polylines: any[],
  polygons: {
    agent_id: string;
    category: string;
    color: string;
    geometry_json: string;
    id: number;
    name: string;
    options: any;
    optionsFaded: any;
    path: any[];
    provider_id: number;
  }[],
  padding: any
) {
  try {
    var bounds = new window.google.maps.LatLngBounds();
    var boundsExtended = false;

    markers.forEach(marker => {
      bounds.extend(marker);
      boundsExtended = true;
    });

    polylines.forEach(polyline => {
      polyline.path.forEach((coord: { lng: number; lat: number }) => {
        bounds.extend(coord);
        boundsExtended = true;
      });
    });

    polygons.forEach(multiPolygon => {
      if (multiPolygon.path) {
        multiPolygon.path.forEach(polygon => {
          polygon.forEach((coord: { lng: number; lat: number }) => {
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
    }
  } catch (e) {
    console.log(e);
  }
}

function closePolygon(path: { lat: number; lng: number }[]) {
  // check to close up polygon
  if (path.length >= 2) {
    let latStart = path[0].lat;
    let lngStart = path[0].lng;

    let latEnd = path[path.length - 1].lat;
    let lngEnd = path[path.length - 1].lng;

    if (latStart !== latEnd || lngStart !== lngEnd) {
      path.push(path[0]);
    }
  }

  return path;
}

function canEditPolygonVertices(paths: { lat: number; lng: number }[][], maxNodeCount: number) {
  let count: number = 0;
  paths.forEach(path => {
    count += path.length;
  });

  return count <= maxNodeCount;
}

function getPathFromGooglePolygon(polygonRef: any) {
  let paths: any[] = [];
  polygonRef.getPaths().forEach((polygon: any) => {
    let path: any[] = [];
    polygon.forEach((p: any) => {
      path.push({ lat: p.lat(), lng: p.lng() });
    });
    paths.push(path);
  });

  return paths;
}

function removeDuplicateLatLngs(path: { lat: any; lng: any }[]) {
  for (let i = path.length - 2; i >= 0; i--) {
    if (path[i].lat === path[i + 1].lat && path[i].lng === path[i + 1].lng) {
      path.splice(i + 1, 1);
    }
  }
  return path;
}

function pathCrossesAntimeridian(path: { lat: number; lng: number }[]): boolean {
  let crosses = false;
  for (let i = 0; i < path.length; i++) {
    let indexBefore = i === 0 ? path.length - 1 : i - 1;
    let max = path[i].lng > path[indexBefore].lng ? path[i].lng : path[indexBefore].lng;
    let min = path[i].lng < path[indexBefore].lng ? path[i].lng : path[indexBefore].lng;
    if (max - min > 180) {
      crosses = true;
    }
  }
  return crosses;
}

function getAntimeridianCrossings(
  path: { lat: number; lng: number }[]
): { index: number; indexBefore: number; crossingLat: number }[] {
  let crossings = [];

  for (let i = 0; i < path.length; i++) {
    let indexBefore = i === 0 ? path.length - 1 : i - 1;
    let max = path[i].lng > path[indexBefore].lng ? path[i].lng : path[indexBefore].lng;
    let min = path[i].lng < path[indexBefore].lng ? path[i].lng : path[indexBefore].lng;
    if (max - min > 180) {
      // x0 and x1 are determined by transposing the polygon to be on the x=0 axis instead of x = -180/180
      let x0 = path[i].lng > 0 ? -(180 - Math.abs(path[i].lng)) : 180 - Math.abs(path[i].lng);
      let x1 =
        path[indexBefore].lng > 0
          ? -(180 - Math.abs(path[indexBefore].lng))
          : 180 - Math.abs(path[indexBefore].lng);
      let m = (path[i].lat - path[indexBefore].lat) / (x0 - x1);
      let c = path[i].lat - m * x0; // c is the y intercept and will be the same at x = -180/180
      crossings.push({
        index: i,
        indexBefore,
        crossingLat: c
      });
    }
  }

  return crossings.sort((a: any, b: any) => {
    if (a.crossingLat < b.crossingLat) {
      return 1;
    }
    if (a.crossingLat > b.crossingLat) {
      return -1;
    }
    return 0;
  });
}

function pathToFollowRightHandRule(path: any) {
  // ensures the path follows an anticlockwise direction
  let signedArea = google.maps.geometry.spherical.computeSignedArea(path);
  let rightHandPath = [];
  if (signedArea < 0) {
    for (let i = 0; i < path.length; i++) {
      if (i === 0) {
        rightHandPath[0] = path[0];
      } else {
        rightHandPath[i] = path[path.length - i];
      }
    }
    return rightHandPath;
  }
  return path;
}

function startPathBeforeFirstCrossing(path: any) {
  let crossings = getAntimeridianCrossings(path);
  for (let i = 0; i < crossings[0].index; i++) {
    let obj = path[0];
    path.push(obj);
    path.splice(0, 1);
  }
  return path;
}

function splitAcrossAntimeridian(path: any): any[] {
  path = pathToFollowRightHandRule(path); // standard convention
  let crosses = pathCrossesAntimeridian(path);

  if (crosses) {
    path = startPathBeforeFirstCrossing(path);
    let crossings = getAntimeridianCrossings(path);
    let polygonA: any = []; // always to the left of antimeridian because of startPathBeforeFirstCrossing
    let polygonB: any = []; // always to the right of antimeridian because of startPathBeforeFirstCrossing

    path.forEach((c: { lat: number; lng: number }, i: number) => {
      if (i === crossings[0].indexBefore) {
        polygonA.push({ lat: crossings[0].crossingLat, lng: 180 });
      }
      if (i === crossings[1].indexBefore) {
        polygonB.push({ lat: crossings[1].crossingLat, lng: -180 });
      }

      if (i >= crossings[0].index && i <= crossings[1].indexBefore) {
        polygonA.push({ lat: c.lat, lng: c.lng });
      } else if (i <= crossings[0].indexBefore || i >= crossings[1].index) {
        polygonB.push({ lat: c.lat, lng: c.lng });
      }

      if (i === crossings[0].indexBefore) {
        polygonB.push({ lat: crossings[0].crossingLat, lng: -180 });
      }
      if (i === crossings[1].indexBefore) {
        polygonA.push({ lat: crossings[1].crossingLat, lng: 180 });
      }
    });

    return splitAcrossAntimeridian(polygonA).concat(splitAcrossAntimeridian(polygonB));
  } else {
    return [path];
  }
}

async function ensureValidPolygonOverAntimeridian(paths: any[]) {
  // When a polygon overlaps the antimeridian, some strange behaviour sometimes occurs. This function will split a polygon into multiple polygons over the antimeridian
  let newPaths: any = [];
  paths.forEach((path: any) => {
    newPaths = newPaths.concat(splitAcrossAntimeridian(path));
  });

  return newPaths;
}

export {
  loadGoogleMaps,
  getGeometryJSONFromPath,
  getPathFromGeometryJSON,
  getPathFromGooglePolygon,
  canEditPolygonVertices,
  pointWithPaddedBounds,
  refitBoundsOfMap,
  closePolygon,
  polygonOptions,
  polygonOptionsFaded,
  removeDuplicateLatLngs,
  ensureValidPolygonOverAntimeridian
};
