export interface IPolygon {
    id: any;
    data: any;
    paths: any[];
    options: {
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        fillColor?: string;
        fillOpacity?: number;
        editable?: boolean;
        tooltip?: Function;
        tooltipXOffset?: number;
        tooltipYOffset?: number;
        isEditable?: Function;
    };
    onClick?: Function;
}
