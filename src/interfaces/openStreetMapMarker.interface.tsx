export interface IOpenStreetMapMarker {
  data: { id: number } | any;
  coordinates: { lat: number; lng: number };
  options: {
    icon?: string;
    iconWidth?: number;
    iconHeight?: number;
    tooltip?: string;
    tooltipPixelOffset?: { x: number; y: number };
  };
  onClick?: (e: any, marker: IOpenStreetMapMarker) => void;
}
