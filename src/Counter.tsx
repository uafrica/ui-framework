// @ts-ignore
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./Input";
import { Label } from "./Label";
import { useState } from "react";
import { ICounter } from "./interfaces/counter.interface";

function Counter(props: ICounter) {
  const {
    min,
    max,
    step = 1,
    inputID,
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

  const [inputValue, setInputValue] = useState(value ? value : 0);

  function renderLabel() {
    return (
      <div className="flex justify-between">
        <Label
          htmlFor={htmlFor}
          className={labelClassName}
          noMargin={isLabelInline}
        >
          {label}
        </Label>
      </div>
    );
  }

  function renderDecreaseButton() {
    const isDecreaseDisabled =
      (min !== undefined && inputValue - step < min) || isDisabled;

    return (
      <div
        style={{ height: shouldOverlapLabel ? "49px" : "37px" }}
        className={
          "flex justify-center items-center w-12 shadow-sm border rounded-l-md " +
          (isDecreaseDisabled
            ? "bg-gray-100 border-gray-100 cursor-not-allowed"
            : "bg-primary-100 hover:bg-primary-200 border-primary-100 cursor-pointer")
        }
        onClick={() => {
          if (!isDecreaseDisabled) {
            setInputValue(Number(inputValue) - step);
            if (onChange) {
              onChange(Number(inputValue) - step);
            }
          }
        }}
      >
        <FontAwesomeIcon
          icon="minus"
          className={isDecreaseDisabled ? "text-gray-500" : "text-primary"}
        />
      </div>
    );
  }

  function renderInput() {
    return (
      <Input
        shouldOverlapLabel={shouldOverlapLabel}
        isLabelInline
        inputID={inputID}
        containerClassName="w-full "
        inputClassName="input-counter border-primary-100 "
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
          if (onChange) {
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
          }
        }}
        onBlur={() => {
          if (onChange) {
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
          }
        }}
      />
    );
  }

  function renderIncreaseButton() {
    const isIncreaseDisabled =
      (max !== undefined && inputValue + step > max) || isDisabled;

    return (
      <div
        style={{ height: shouldOverlapLabel ? "49px" : "37px" }}
        className={
          "flex justify-center items-center w-12 shadow-sm border rounded-r-md " +
          (isIncreaseDisabled
            ? "bg-gray-100 border-gray-100 cursor-not-allowed"
            : "bg-primary-100 hover:bg-primary-200 border-primary-100 cursor-pointer")
        }
        onClick={() => {
          if (!isIncreaseDisabled) {
            setInputValue(Number(inputValue) + step);
            if (onChange) {
              onChange(Number(inputValue) + step);
            }
          }
        }}
      >
        <FontAwesomeIcon
          icon="plus"
          className={isIncreaseDisabled ? "text-gray-500" : "text-primary"}
        />
      </div>
    );
  }
  function render() {
    return (
      <div
        className={
          containerClassName ?? isLabelInline
            ? " flex items-center flex-row space-x-4"
            : " mt-4 max-w-sm"
        }
      >
        {label && renderLabel()}
        <div className=" flex items-center flex-row w-full">
          {renderDecreaseButton()}
          {renderInput()}
          {renderIncreaseButton()}
        </div>
      </div>
    );
  }
  return render();
}

export { Counter };
