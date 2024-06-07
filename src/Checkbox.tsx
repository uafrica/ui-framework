// @ts-ignore
import React from "react";
import { InfoButton } from "./InfoButton";
import { ICheckbox } from "./interfaces/checkbox.interface";

function Checkbox(props: ICheckbox) {
  let {
    onClick,
    label,
    labelClassName,
    htmlFor,
    fieldId,
    info,
    className,
    id,
    isCenter: center,
    isChecked: checked,
    key,
    labelLeft,
    labelRight,
    hoverTitle,
    noPadding,
    isDisabled,
    textColor,
    dataTest,
  } = props;

  const labelEl = (
    <label
      className={
        (isDisabled ? "text-gray-500 " : "text-base cursor-pointer ") +
        "  flex items-center  " +
        (labelClassName ? labelClassName : "")
      }
      htmlFor={htmlFor}
    >
      {label}
      {info && <InfoButton>{info}</InfoButton>}
    </label>
  );

  let textDisplayColor =
    textColor && textColor.length > 0 ? textColor : "primary";

  return (
    <div className="flex items-start">
      <div
        id={id}
        onClick={(e) => {
          if (!isDisabled && onClick) {
            onClick(e);
          }
        }}
        key={key}
        className={
          (noPadding ? "" : "py-2 px-1 ") +
          "  flex items-center  space-x-4 " +
          (center ? " justify-center " : "") +
          (isDisabled ? "" : " cursor-pointer ")
        }
      >
        {label && (labelLeft || (!labelLeft && !labelRight)) && labelEl}
        <input
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              isDisabled ? null : onClick ? onClick(e) : null;
            }
          }}
          title={hoverTitle}
          type="checkbox"
          data-test={dataTest}
          className={
            " focus:outline-none focus:ring-1 focus:ring-primary  " +
            (isDisabled
              ? "text-gray-500 "
              : `text-${textDisplayColor} hover:border-primary cursor-pointer `) +
            " border-gray-300 rounded " +
            (className ? className : "")
          }
          checked={checked}
          id={fieldId}
          onChange={() => {}}
        />

        {label && labelRight && labelEl}
      </div>
    </div>
  );
}

export { Checkbox };
