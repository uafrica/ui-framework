import { InfoButton } from "./InfoButton";
import { Label } from "./Label";

const defaultContainerClass = "mt-3";

// Interface
interface ITextarea {
  label?: any;
  labelClassName?: string;
  htmlFor?: string;
  fieldClassName?: string;
  fieldId?: string;
  className?: string;
  info?: string;
  id?: string;
  value?: any;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  optional?: boolean;
  onChange?: any;
  placeholder?: string;
  infoButton?: any;
  register?: any;
  validationError?: any;
  errorMessage?: any;
  fixed?: boolean;
  areaStyles?: any;
}

// Implementation
function Textarea(props: ITextarea) {
  let {
    fieldClassName,
    fieldId,
    label,
    labelClassName,
    info,
    id,
    value,
    defaultValue,
    name,
    register,
    placeholder,
    validationError,
    onChange,
    infoButton,
    errorMessage,
    areaStyles,
    optional
  } = props;

  return (
    <div className={fieldClassName ? fieldClassName : defaultContainerClass} id={fieldId}>
      <div className="flex justify-between">
        {label && (
          <div>
            <Label className={labelClassName}>{label}</Label>
            {!optional && " *"}
            {info && <InfoButton>{info}</InfoButton>}
          </div>
        )}
        {optional && <span className="text-gray-500">Optional</span>}
      </div>
      <textarea
        className="mt-2 shadow-sm block w-full border border-gray-300 rounded-md"
        id={id}
        value={value}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        style={areaStyles}
        ref={register}
      />
      {validationError &&
        (errorMessage && validationError.type === "required" ? (
          <div className="error">{errorMessage}</div>
        ) : (
          <div className="error p-0">{validationError.message}</div>
        ))}
      {infoButton && { infoButton }}
    </div>
  );
}

export { Textarea };
