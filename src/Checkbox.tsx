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
  textColor?: string;
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
    disabled,
    textColor
  } = props;

  const labelEl = (
    <label
      className={
        (disabled ? "text-gray-500 " : "text-base cursor-pointer ") +
        " u-vertical-center " +
        (labelClassName ? labelClassName : "")
      }
      htmlFor={htmlFor}
    >
      {label}
      {info && <InfoButton>{info}</InfoButton>}
    </label>
  );

  let textDisplayColor = textColor && textColor.length > 0 ? textColor : "primary";

  return (
    <div className="flex items-start">
      <div
        id={id}
        onClick={disabled ? null : onClick}
        key={key}
        className={
          (noPadding ? "" : "py-2 px-1 ") +
          " u-vertical-center space-x-4 " +
          (center ? " justify-center " : "") +
          (disabled ? "" : " cursor-pointer ")
        }
      >
        {label && (labelLeft || (!labelLeft && !labelRight)) && labelEl}
        <input
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              disabled ? null : onClick(e);
            }
          }}
          title={hoverTitle}
          type="checkbox"
          className={
            "u-focus " +
            (disabled
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
