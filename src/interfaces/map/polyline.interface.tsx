export interface IPolyline {
  data: { id: number } | any;
  path: { lat: number; lng: number }[];
  options?: {
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    icons?: any[];
  };
  onClick?: (e: any, polyline: IPolyline) => void;
}
