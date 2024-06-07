// @ts-ignore
import React from "react";
import { ICard } from "./interfaces/card.interface";

function Card(props: ICard) {
  let { mediumWidth, width, children, padding } = props;
  let className = props.className ? props.className : "";

  return (
    <div
      className={
        "xs:shadow-md rounded-md bg-white mt-3 mb-2 border-gray-100  " +
        (className.includes("border") ? "" : "border ") +
        (width
          ? ` mx-2 inline-block ${padding ? padding : "p-2 xs:p-6"} `
          : ` ${padding ? padding : "p-4 xs:p-6"} block `) +
        className +
        (mediumWidth ? "w-full sm:w-" + mediumWidth : "")
      }
      style={{ width: width }}
    >
      {children}
    </div>
  );
}

export { Card };
