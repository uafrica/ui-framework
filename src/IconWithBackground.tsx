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
  let { icon, color = "black" } = props;

  return (
    <div
      className={`rounded-full  flex items-center justify-center  h-8 w-8 bg-${color}-100`}
    >
      <FontAwesomeIcon size="sm" icon={icon} className={`text-${color}-500`} />
    </div>
  );
}

export { IconWithBackground };
