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
    tooltip?: Function;
    tooltipPixelOffset?: { x: number; y: number };
    isEditable?: Function;
    tooltipMode?: "click" | "hover";
  };
  onClick?: Function;
}
