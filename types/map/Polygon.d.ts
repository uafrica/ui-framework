/// <reference types="react" />
import { IPolygon } from "./../interfaces/polygon.interface";
declare function Polygon(props: {
    polygon: IPolygon;
    zIndex: number;
    onClick?: Function;
    onMouseOver: Function;
    onMouseOut: Function;
    editable: boolean;
    onPolygonUpdated: Function;
    snapPointToPolygon: Function;
    doSnap: boolean;
}): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof Polygon>;
export default _default;
