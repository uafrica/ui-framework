import { Polyline as GoogleMapsPolyline } from "@react-google-maps/api";
import { memo } from "react";
import { IPolyline } from "../interfaces/polyline.interface";

function Polyline(props: { polyline: IPolyline; onClick?: Function }) {
  let { polyline } = props;

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
