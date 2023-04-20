/// <reference types="google.maps" />
import { IMarker, IPolygon } from "./../interfaces";
declare function Map(props: {
    readonly?: boolean;
    polygons?: IPolygon[];
    markers?: IMarker[];
    mapContainerStyle?: any;
    defaultCenter: {
        lat: number;
        lng: number;
    };
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
}): JSX.Element;
export { Map };
