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
  };
  onClick?: Function
}
