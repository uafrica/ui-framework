export interface IMarker {
  data: { id: number } | any;
  coordinates: { lat: number; lng: number };
  options: {
    icon?: string;
    svgMarker?: { url: string; scaledSize: any };
    iconWidth?: number;
    iconHeight?: number;
    tooltip?: Function;
    isDraggable?: boolean;
    tooltipMode?: "click" | "hover";
  };
  onClick?: Function;
  onDragEnd?: Function;
}
