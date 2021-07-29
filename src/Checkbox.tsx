import { InfoButton } from "./InfoButton";

interface IProps {
  key?: any;
  fieldId?: string;
  onClick?: any;
  label?: any;
  labelClassName?: string;
  htmlFor?: string;
  info?: string;
  className?: string;
  id?: string;
  onChange?: any;
  checked?: boolean;
  center?: boolean;
  disabled?: boolean;
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
    onChange,
    key,
    labelLeft,
    labelRight
  } = props;

  const labelEl = (
    <label className={"text-base " + (labelClassName ? labelClassName : "")} htmlFor={htmlFor}>
      {label}
      {info && <InfoButton>{info}</InfoButton>}
    </label>
  );

  return (
    <div
      id={id}
      onClick={onClick}
      key={key}
      className={"py-2 px-1 items-center flex space-x-4 " + (center ? "justify-center " : "")}
    >
      {label && (labelLeft || (!labelLeft && !labelRight)) && labelEl}
      <input
        type="checkbox"
        className={"text-blue border-gray-300 rounded " + (className ? className : "")}
        checked={checked}
        id={fieldId}
        onChange={onChange}
      />

      {label && labelRight && labelEl}
    </div>
  );
}

export { Checkbox };
