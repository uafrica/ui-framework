import { Label } from "./Label";

interface IRadioButtonProps {
  label: string;
  onChange?: any;
  checked?: boolean;
  disabled?: boolean;
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
  disabled?: boolean;
  labelClassName?: string;
  className?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  name: string;
}

function Button(props: IRadioButtonProps) {
  let { label, onChange, disabled, labelClassName, className, labelLeft, labelRight, name } = props;

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
          (disabled ? "text-gray-500 " : "text-base cursor-pointer ") +
          " u-vertical-center " +
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
        {label && (labelLeft || (!labelLeft && !labelRight)) && renderLabel(label)}
        <input
          type="radio"
          className={
            (labelLeft ? "ml-2 " : "mr-2 ") +
            "cursor-pointer form-radio u-focus " +
            (disabled ? "text-gray-500 " : "text-primary hover:border-primary ") +
            " border-gray-300  " +
            (className ? className : "")
          }
          disabled={disabled}
          id={label}
          name={name}
          value={label}
          onChange={e => {
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
    disabled,
    labelClassName,
    className,
    labelLeft,
    labelRight,
    name
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
                disabled={disabled}
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
  Group
};

export { Radio };
