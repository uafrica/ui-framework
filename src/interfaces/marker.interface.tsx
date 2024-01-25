export interface IMarker {
  data: { id: number } | any;
  coordinates: { lat: number; lng: number };
  options: {
    icon?: string;
    svgMarker?: { url: string; scaledSize: any };
    iconWidth?: number;
    iconHeight?: number;
    tooltip?: (
      marker: IMarker,
      hideTooltip: Function,
      markerGroupMode?: "single" | "multiple" | "modal"
    ) => JSX.Element | null;
    tooltipPixelOffset?: { x: number; y: number };
    isDraggable?: boolean;
    tooltipMode?: "click" | "hover";
  };
  onClick?: (e: any, marker: IMarker) => void;
  onDragEnd?: Function;
}
