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
  checked?: boolean;
  center?: boolean;
  disabled?: boolean;
  noPadding?: boolean;
  labelLeft?: boolean;
  labelRight?: boolean;
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
    center,
    checked,
    key,
    labelLeft,
    labelRight,
    hoverTitle,
    noPadding,
    disabled
  } = props;

  const labelEl = (
    <label
      className={
        (disabled ? "text-gray-500 " : "text-base cursor-pointer ") +
        " flex items-center " +
        (labelClassName ? labelClassName : "")
      }
      htmlFor={htmlFor}
    >
      {label}
      {info && <InfoButton>{info}</InfoButton>}
    </label>
  );

  return (
    <div className="flex items-start">
      <div
        id={id}
        onClick={disabled ? null : onClick}
        key={key}
        className={
          (noPadding ? "" : "py-2 px-1 ") +
          " items-center flex space-x-4 " +
          (center ? " justify-center " : "") +
          (disabled ? "" : " cursor-pointer ")
        }
      >
        {label && (labelLeft || (!labelLeft && !labelRight)) && labelEl}
        <input
          title={hoverTitle}
          type="checkbox"
          className={
            "focus:ring-0 " +
            (disabled ? "text-gray-500 " : "text-primary hover:border-primary cursor-pointer ") +
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
