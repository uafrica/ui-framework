import { IMarker } from "./../interfaces";
declare function Marker(props: {
    markerGroup: IMarker[];
    onClick?: Function;
    onMouseOver: Function;
    onMouseOut: Function;
    onDragEnd: Function;
}): JSX.Element;
export default Marker;
