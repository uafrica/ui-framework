/// <reference types="google.maps" />
declare const polygonOptions: {
    fillOpacity: number;
    strokeOpacity: number;
    strokeWeight: number;
    editable: boolean;
};
declare const polygonOptionsFaded: {
    fillOpacity: number;
    strokeOpacity: number;
    strokeWeight: number;
    editable: boolean;
    somethingChanged: boolean;
};
declare function loadGoogleMaps(store: any, scriptSrc: string): any;
declare function getGeometryJSONFromPath(path: any): {
    type: string;
    coordinates: any[];
};
declare function getPathFromGeometryJSON(objectWithGeometryJSON: string): any[];
declare function pointWithPaddedBounds(lat_lng: any): google.maps.LatLngBounds;
declare function refitBoundsOfMap(map: any, markers: any[], polylines: any[], polygons: {
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
}[], padding: any): void;
declare function closePolygon(path: {
    lat: number;
    lng: number;
}[]): {
    lat: number;
    lng: number;
}[];
declare function canEditPolygonVertices(paths: {
    lat: number;
    lng: number;
}[][], maxNodeCount: number): boolean;
declare function getPathFromGooglePolygon(polygonRef: any): any[];
declare function removeDuplicateLatLngs(path: {
    lat: any;
    lng: any;
}[]): {
    lat: any;
    lng: any;
}[];
declare function ensureValidPolygonOverAntimeridian(paths: any[]): Promise<any>;
export { loadGoogleMaps, getGeometryJSONFromPath, getPathFromGeometryJSON, getPathFromGooglePolygon, canEditPolygonVertices, pointWithPaddedBounds, refitBoundsOfMap, closePolygon, polygonOptions, polygonOptionsFaded, removeDuplicateLatLngs, ensureValidPolygonOverAntimeridian };
