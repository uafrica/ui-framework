import React from "react";
import { InfoButton } from "./InfoButton";

// Interface
interface ILabel {
  children?: any;
  className?: string;
  htmlFor?: any;
  noMargin?: boolean;
  labelColor?: string;
}

interface ILabelWithValue {
  label: string;
  value: any;
  noMargin?: boolean;
  info?: string;
  labelColor?: string;
  doNotShowEnDash?: boolean;
  dataTest?: string | undefined;
}

// Implementation
function Label(props: ILabel) {
  let { children, htmlFor, className, noMargin, labelColor } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={
        "font-semibold mr-2 flex items-center text-left " +
        (noMargin ? "" : " mb-2 ") +
        " " +
        (className ? className : "") +
        " " +
        (labelColor ? labelColor : "text-gray-900")
      }
    >
      {children}
    </label>
  );
}

function LabelWithValue(props: ILabelWithValue) {
  let { label, value, noMargin, info, labelColor, doNotShowEnDash, dataTest } =
    props;

  return (
    <div
      className={
        "flex flex-row items-center flex-wrap " + (noMargin ? "" : " mb-2 pt-2")
      }
    >
      <label
        className={
          "font-semibold mr-2 flex items-center text-left self-baseline" +
          " " +
          (labelColor ? labelColor : "text-gray-900")
        }
      >
        {label}
      </label>
      <div className="ml-2 text-left" data-test={dataTest}>
        {doNotShowEnDash
          ? value
          : value !== undefined && value !== ""
          ? value
          : "–"}
      </div>
      {info && (
        <div>
          <InfoButton>{info}</InfoButton>
        </div>
      )}
    </div>
  );
}

export { Label, LabelWithValue };
