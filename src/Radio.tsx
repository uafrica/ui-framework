 // @ts-ignore
    import React from "react";
import { Label } from "./Label";

interface IRadioButtonProps {
  label: string;
  onChange?: any;
  isChecked?: boolean;
  isDisabled?: boolean;
  labelClassName?: string;
  className?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  name: string;
}

interface IRadioGroupProps {
  title?: any;
  options: string[];
  onChange?: any;
  isDisabled?: boolean;
  labelClassName?: string;
  className?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  name: string;
}

function Button(props: IRadioButtonProps) {
  let {
    label,
    onChange,
    isDisabled,
    labelClassName,
    className,
    labelLeft,
    labelRight,
    name,
    isChecked,
  } = props;

  function selectOption() {
    var list = document.querySelectorAll(`input[name='${name}']`);
    list.forEach((item: any) => {
      if (item.value === label) {
        item.checked = true;
        onChange(item.value);
      } else {
        item.checked = false;
      }
    });
  }

  function renderLabel(option: string) {
    return (
      <label
        onClick={() => {
          selectOption();
        }}
        className={
          (isDisabled ? "text-gray-500 " : "text-base cursor-pointer ") +
          "  flex items-center  " +
          (labelClassName ? labelClassName : "")
        }
      >
        {option}
      </label>
    );
  }

  return (
    <div className="flex items-start">
      <label className="inline-flex items-center">
        {label &&
          (labelLeft || (!labelLeft && !labelRight)) &&
          renderLabel(label)}
        <input
          type="radio"
          className={
            (labelLeft ? "ml-2 " : "mr-2 ") +
            "cursor-pointer form-radio  focus:outline-none focus:ring-1 focus:ring-primary  " +
            (isDisabled
              ? "text-gray-500 "
              : "text-primary hover:border-primary ") +
            " border-gray-300  " +
            (className ? className : "")
          }
          disabled={isDisabled}
          id={label}
          name={name}
          value={label}
          checked={isChecked}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        {label && labelRight && renderLabel(label)}
      </label>
    </div>
  );
}

function Group(props: IRadioGroupProps) {
  let {
    title,
    options,
    onChange,
    isDisabled,
    labelClassName,
    className,
    labelLeft,
    labelRight,
    name,
  } = props;
  return (
    <div className="">
      {title && <Label>{title}</Label>}
      <div className={(title ? "ml-2 " : "") + "mt-2  " + className}>
        {options.map((option, i) => {
          return (
            <div className="mt-2" key={i}>
              <Button
                name={name}
                labelClassName={labelClassName}
                isDisabled={isDisabled}
                labelLeft={labelLeft}
                labelRight={labelRight}
                label={option}
                onChange={(value: boolean) => {
                  onChange(value);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Radio = {
  Button,
  Group,
};

export { Radio };
