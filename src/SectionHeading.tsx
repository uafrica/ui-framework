// @ts-ignore
import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISectionHeading } from "./interfaces/sectionHeading.interface";

function SectionHeading(props: ISectionHeading) {
  const {
    children,
    icon,
    iconColor = "black",
    editIconClassName,
    toggleEditMode,
    hideEditMode,
    isCenter: center,
    marginTop,
    noMarginBottom,
    options,
  } = props;

  function renderIcon() {
    return (
      <div className="w-8">
        <div
          className={`rounded-full flex items-center justify-center h-8 w-8 bg-${iconColor}-100`}
        >
          {icon && (
            <FontAwesomeIcon
              size="sm"
              icon={icon}
              className={`text-${iconColor}-500`}
            />
          )}
        </div>
      </div>
    );
  }

  function renderChildren() {
    return (
      <h2 className="text-lg font-bold text-gray-900 mt-1  flex items-center  ">
        {children}
      </h2>
    );
  }

  function renderEditButton() {
    return (
      <FontAwesomeIcon
        icon="pencil-alt"
        className={editIconClassName ?? "mt-1 text-primary cursor-pointer"}
        onClick={() => {
          if (toggleEditMode) {
            toggleEditMode();
          }
        }}
      />
    );
  }

  function render() {
    return (
      <div
        className={`flex items-center flex-row space-x-4 
      ${center ? "justify-center" : ""} 
      ${marginTop ? " mt-8" : ""} 
      ${noMarginBottom ? "" : " mb-4 "}}`}
      >
        {icon && renderIcon()}
        {renderChildren()}
        {toggleEditMode && !hideEditMode && renderEditButton()}
        {options && options}
      </div>
    );
  }
  return render();
}

export { SectionHeading };
