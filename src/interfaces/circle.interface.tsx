export interface ICircle {
  center: { lat: number; lng: number };
  radius: number; // Radius in meters
  options: {
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
  };
  onClick?: Function;
}
