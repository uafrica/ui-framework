import * as generalUtils from "../utils/generalUtils";
import { Card } from "./../Card";
import { memo, useEffect, useRef, useState } from "react";

function Tooltip(props: { content: any; show: boolean; mapId: string }) {
  let { content, show, mapId } = props;

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipId, setTooltipId] = useState<string>("");
  let tooltipIDRef = useRef("");

  useEffect(() => {
    let tooltipId = `tooltip_${generalUtils.generateRandomString(10)}`;
    tooltipIDRef.current = tooltipId;
    setTooltipId(tooltipId);
    window.addEventListener("mousemove", getTooltipPosition);

    return () => {
      window.removeEventListener("mousemove", getTooltipPosition);
    };
  }, []);

  function getTooltipPosition(e: any) {
    let mapElement = document.getElementById(mapId);
    let popupElement = document.getElementById(tooltipIDRef.current);

    if (mapElement && popupElement) {
      const yOffsetFromCursor = 5; // prevents popup from blocking cursor
      const xOffsetFromCursor = 5; // prevents popup from blocking cursor
      const mapRect = mapElement.getBoundingClientRect();
      const popupRect = popupElement.getBoundingClientRect();

      const mouseRelativeToMapX = e.clientX - mapRect.left;
      const mouseRelativeToMapY = e.clientY - mapRect.top;
      let { width: mapWidth, height: mapHeight } = mapRect;
      let { width: popupWidth, height: popupHeight } = popupRect;

      if (
        mouseRelativeToMapX >= 0 &&
        mouseRelativeToMapY >= 0 &&
        mouseRelativeToMapX <= mapWidth &&
        mouseRelativeToMapY <= mapHeight
      ) {
        let x = 0;
        let y = 0;
        if (mouseRelativeToMapX + popupWidth <= mapWidth) {
          x = mouseRelativeToMapX + xOffsetFromCursor; // tooltip fits to the right of cursor
        } else if (mouseRelativeToMapX - popupWidth > 0) {
          // if there is no space to the right, position to the left of the cursor
          x = mouseRelativeToMapX - popupWidth - xOffsetFromCursor;
        } else {
          // else center tooltip horizontally
          x = (mapWidth - popupWidth) / 2;
        }

        if (mouseRelativeToMapY + popupHeight <= mapHeight) {
          y = mouseRelativeToMapY + yOffsetFromCursor; // tooltip fits at the bottom of cursor
        } else if (mouseRelativeToMapY - popupHeight > 0) {
          // if there is no space at the bottom, position at the top of the cursor
          y = e.clientY - mapRect.top - popupHeight - yOffsetFromCursor;
        } else {
          y = mouseRelativeToMapY + yOffsetFromCursor;
        }
        setTooltipPosition({ top: y, left: x });
      }
    }
  }

  function render() {
    return tooltipId ? (
      <div
        id={tooltipId}
        style={{
          position: "absolute",
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`
        }}
      >
        {show && <Card padding="p-0">{content}</Card>}
      </div>
    ) : (
      <></>
    );
  }

  return render();
}

export default memo(Tooltip);
