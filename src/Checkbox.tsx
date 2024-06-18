// @ts-ignore
import React from "react";
import { InfoButton } from "./InfoButton";
import { ICheckbox } from "./interfaces/checkbox.interface";

function Checkbox(props: ICheckbox) {
  const {
    onClick,
    label,
    labelClassName,
    htmlFor,
    fieldId,
    info,
    className = "",
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

  const textDisplayColor =
    textColor && textColor.length > 0 ? textColor : "primary";
  const paddingClass = noPadding ? "" : "py-2 px-1 ";
  const centerClass = center ? " justify-center " : "";
  const disabledClass = isDisabled ? "" : " cursor-pointer ";
  const inputDisabledClass = isDisabled
    ? "text-gray-500 "
    : `text-${textDisplayColor} hover:border-primary cursor-pointer `;

  function render() {
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
          className={`${paddingClass} flex items-center space-x-4 ${centerClass} ${disabledClass} `}
        >
          {label && (labelLeft || (!labelLeft && !labelRight)) && labelEl}
          <input
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                if (!isDisabled && onClick) {
                  onClick(e);
                }
              }
            }}
            title={hoverTitle}
            type="checkbox"
            data-test={dataTest}
            className={`focus:outline-none focus:ring-1 focus:ring-primary ${inputDisabledClass} border-gray-300 rounded ${className} `}
            checked={checked}
            id={fieldId}
            onChange={() => {}}
          />

          {label && labelRight && labelEl}
        </div>
      </div>
    );
  }

  return render();
}

export { Checkbox };
