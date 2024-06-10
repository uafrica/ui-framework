// @ts-ignore
import React from "react";
import { ICard } from "./interfaces/card.interface";

function Card(props: ICard) {
  const { mediumWidth, width, children, padding } = props;
  const className = props.className ?? "";
  const borderClass = className.includes("border") ? "" : "border ";
  const paddingClass = width
    ? ` mx-2 inline-block ${padding ? padding : "p-2 xs:p-6"} `
    : ` ${padding ? padding : "p-4 xs:p-6"} block `;
  const widthClass = mediumWidth ? "w-full sm:w-" + mediumWidth : "";
  return (
    <div
      className={`xs:shadow-md rounded-md bg-white mt-3 mb-2 border-gray-100 
        ${borderClass} 
        ${borderClass} 
        ${paddingClass} 
        ${className} 
        ${widthClass} `}
      style={{ width: width }}
    >
      {children}
    </div>
  );
}

export { Card };
