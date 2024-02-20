// @ts-ignore
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Interface
interface IIconWithBackground {
  icon: IconProp;
  color: string;
}

function IconWithBackground(props: IIconWithBackground) {
  let { icon, color } = props;

  return (
    <div
      className={
        "rounded-full  flex items-center justify-center  h-8 w-8 bg-" +
        (color ? color : "black") +
        "-100"
      }
    >
      <FontAwesomeIcon
        size="sm"
        icon={icon}
        className={"text-" + (color ? color : "black") + "-500"}
      />
    </div>
  );
}

export { IconWithBackground };
