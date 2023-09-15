import React from "react";
import { InfoButton } from "./InfoButton";

interface IProps {
  key?: any;
  fieldId?: string;
  onClick?: any;
  label?: any;
  labelClassName?: string;
  htmlFor?: string;
  hoverTitle?: string;
  info?: string;
  className?: string;
  id?: string;
  isChecked?: boolean;
  isCenter?: boolean;
  isDisabled?: boolean;
  noPadding?: boolean;
  labelLeft?: boolean;
  labelRight?: boolean;
  textColor?: string;
  dataTest?: string | undefined;
}

function Checkbox(props: IProps) {
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
        onClick={isDisabled ? null : onClick ?? null}
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
