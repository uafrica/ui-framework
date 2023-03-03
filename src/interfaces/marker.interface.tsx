export interface IMarker {
  data: { id: number };
  coordinates: { lat: number; lng: number };
  options: {
    icon: string;
    iconWidth: number;
    iconHeight: number;
    tooltip?: Function;
    tooltipXOffset?: number;
    tooltipYOffset?: number;
    isDraggable?: boolean;
  };
  onClick?: Function;
  onDragEnd?: Function;
}
