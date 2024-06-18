import { Polyline as GoogleMapsPolyline } from "@react-google-maps/api";
// @ts-ignore
import React, { memo } from "react";
import { IPolyline } from "../interfaces/map/polyline.interface";

function Polyline(props: { polyline: IPolyline; onClick?: Function }) {
  const { polyline } = props;

  function render() {
    return (
      <GoogleMapsPolyline
        options={polyline?.options}
        path={polyline.path}
        onClick={(e: google.maps.PolyMouseEvent) => {
          if (polyline.onClick) {
            polyline.onClick(e, polyline);
          }
        }}
      />
    );
  }

  return render();
}

export default memo(Polyline);
