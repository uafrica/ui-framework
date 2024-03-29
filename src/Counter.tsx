// @ts-ignore
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./Input";
import { Label } from "./Label";
import { useState } from "react";

interface ICounterProps {
  label?: string;
  isLabelInline?: boolean;
  labelClassName?: string;
  value?: any;
  onChange?: any;
  step?: any;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  placeholder?: string;
  id?: string;
  shouldAutoFocus?: any;
  inputID?: string;
  containerClassName?: string;
  htmlFor?: string;
  shouldOverlapLabel?: boolean;
}

function Counter(props: ICounterProps) {
  let {
    min,
    max,
    step,
    inputID: inputID,
    value,
    isDisabled,
    placeholder,
    shouldAutoFocus,
    onChange,
    containerClassName,
    isLabelInline,
    label,
    htmlFor,
    labelClassName,
    shouldOverlapLabel,
  } = props;

  if (step === undefined) {
    step = 1;
  }

  const [inputValue, setInputValue] = useState(value ? value : 0);

  let decreaseDisabled =
    (min !== undefined && inputValue - step < min) || isDisabled;
  let increaseDisabled =
    (max !== undefined && inputValue + step > max) || isDisabled;

  return (
    <div
      className={
        containerClassName
          ? containerClassName
          : isLabelInline
          ? " flex items-center  flex-row space-x-4"
          : "mt-4 max-w-sm"
      }
    >
      {label && label.length > 0 && (
        <div className="flex justify-between">
          <Label
            htmlFor={htmlFor}
            className={labelClassName}
            noMargin={isLabelInline}
          >
            {label}
          </Label>
        </div>
      )}
      <div className=" flex items-center  flex-row w-full">
        <div
          style={{ height: shouldOverlapLabel ? "49px" : "37px" }}
          className={
            "flex justify-center items-center w-12 shadow-sm border rounded-l-md " +
            (decreaseDisabled
              ? "bg-gray-100 border-gray-100 cursor-not-allowed"
              : "bg-primary-100 hover:bg-primary-200 border-primary-100 cursor-pointer")
          }
          onClick={() => {
            if (!decreaseDisabled) {
              setInputValue(Number(inputValue) - step);
              onChange(Number(inputValue) - step);
            }
          }}
        >
          <FontAwesomeIcon
            icon={"minus"}
            className={decreaseDisabled ? "text-gray-500" : "text-primary"}
          />
        </div>

        <Input
          shouldOverlapLabel={shouldOverlapLabel}
          isLabelInline
          inputID={inputID}
          containerClassName="w-full "
          inputClassName="input-counter  border-primary-100 "
          step={step}
          min={min}
          max={max}
          value={inputValue !== 0 && inputValue !== undefined ? inputValue : ""}
          isDisabled={isDisabled}
          placeholder={placeholder}
          type="number"
          shouldAutoFocus={shouldAutoFocus}
          onChange={(e: any) => {
            // Only change value if within any specified limits
            setInputValue(e.target.value);
            if (min !== undefined && max !== undefined) {
              if (e.target.value >= min && e.target.value <= max) {
                onChange(e.target.value);
              }
            } else if (min !== undefined) {
              if (e.target.value >= min) {
                onChange(e.target.value);
              }
            } else if (max !== undefined) {
              if (e.target.value <= max) {
                onChange(e.target.value);
              }
            } else {
              onChange(e.target.value);
            }
          }}
          onBlur={() => {
            // Ensures the user did not manually enter a value exceeding the limits
            if (min !== undefined || max !== undefined) {
              if (min && inputValue < min) {
                setInputValue(min);
                onChange(min);
              }
              if (max && inputValue > max) {
                setInputValue(max);
                onChange(max);
              }
            } else {
              onChange(inputValue);
            }
          }}
        />
        <div
          style={{ height: shouldOverlapLabel ? "49px" : "37px" }}
          className={
            "flex justify-center items-center w-12 shadow-sm border rounded-r-md " +
            (increaseDisabled
              ? "bg-gray-100 border-gray-100 cursor-not-allowed"
              : "bg-primary-100 hover:bg-primary-200 border-primary-100 cursor-pointer")
          }
          onClick={() => {
            if (!increaseDisabled) {
              setInputValue(Number(inputValue) + step);
              onChange(Number(inputValue) + step);
            }
          }}
        >
          <FontAwesomeIcon
            icon={"plus"}
            className={increaseDisabled ? "text-gray-500" : "text-primary"}
          />
        </div>
      </div>
    </div>
  );
}

export { Counter };
