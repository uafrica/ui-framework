export interface IPolygon {
  id: any;
  data: any; // Any additional data linked to the polygon
  paths: any[];
  options: {
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    editable?: boolean;
    tooltip?: (polygon: IPolygon) => JSX.Element | null;
    tooltipPixelOffset?: { x: number; y: number };
    isEditable?: (polygon: IPolygon) => boolean;
    tooltipMode?: "click" | "hover";
  };
  onClick?: (e: any, polygon: IPolygon) => void;
}
