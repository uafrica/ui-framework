import { Message } from "./Message";
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
  onFocus?: any;
  onBlur?: any;
  placeholder?: string;
  infoButton?: any;
  register?: any;
  registerV7?: any; // For react-hooks-v7+
  required?: boolean; // For react-hooks-v7+
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
    onFocus,
    onBlur,
    infoButton,
    errorMessage,
    rows,
    optional,
    required,
    registerV7
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
        onFocus={onFocus}
        onBlur={onBlur}
        ref={register}
        {...(registerV7 ? registerV7(name, { required }) : [])}
      />
      {validationError &&
        (errorMessage && validationError.type === "required" ? (
          <Message.Error>{errorMessage}</Message.Error>
        ) : (
          <Message.Error>{validationError.message}</Message.Error>
        ))}
      {infoButton && { infoButton }}
    </div>
  );
}

export { Textarea };
