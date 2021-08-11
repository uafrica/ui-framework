import { InfoButton } from "./InfoButton";
import { Label } from "./Label";

const defaultContainerClass = "mt-3";

// Interface
interface ITextarea {
  label?: any;
  labelClassName?: string;
  htmlFor?: string;
  containerClassName?: string;
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
  rows?: any;
}

// Implementation
function Textarea(props: ITextarea) {
  let {
    containerClassName,
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
    rows,
    optional
  } = props;

  return (
    <div className={containerClassName ? containerClassName : defaultContainerClass} id={fieldId}>
      <div className="flex justify-between">
        {label && (
          <div>
            <Label className={labelClassName}>
              {label} {info && <InfoButton>{info}</InfoButton>}
            </Label>
          </div>
        )}
        {optional && <span className="text-gray-500">(Optional)</span>}
      </div>
      <textarea
        className="mt-2 shadow-sm block w-full border border-gray-300 rounded-md"
        id={id}
        value={value}
        rows={rows ? rows : 4}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
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
