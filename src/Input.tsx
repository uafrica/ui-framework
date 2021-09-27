import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "./Select";
import { InfoButton } from "./InfoButton";
import { Label } from "./Label";
import { Message } from "./Message";

// Interfaces
interface IInputProps {
  label?: string;
  labelInline?: boolean;
  labelClassName?: string;
  htmlFor?: string;
  register?: any;
  name?: string;
  defaultValue?: any;
  value?: any;
  validationError?: any;
  type?: string;
  onChange?: any;
  onClick?: any;
  onFocus?: any;
  onBlur?: any;
  onKeyPress?: any;
  onKeyUp?: any;
  step?: any;
  min?: number;
  max?: number;
  autoComplete?: any;
  disabled?: boolean;
  reference?: any;
  placeholder?: string;
  id?: string;
  containerClassName?: string;
  errorMessage?: string;
  autoFocus?: any;
  optional?: boolean; // displays the text "optional" next to the label
  readOnly?: boolean;

  info?: any;
  inputFieldId?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  appendText?: string;
  appendSelectProps?: any;
  prependText?: string;
  inputFieldStyle?: any;
  inputId?: string;
}

// Implementation
function Input(props: IInputProps) {
  let {
    label,
    htmlFor,
    labelClassName,
    inputFieldId,
    readOnly,
    inputFieldStyle,
    placeholder,
    register,
    reference,
    type,
    name,
    defaultValue,
    value,
    validationError,
    inputId,
    appendIcon,
    appendText,
    appendIconId,
    optional,
    disabled,
    errorMessage,
    onChange,
    onClick,
    onFocus,
    prependText,
    onBlur,
    containerClassName,
    labelInline,
    autoFocus,
    onKeyPress,
    onKeyUp,
    step,
    min,
    max,
    autoComplete,
    info,
    appendSelectProps
  } = props;

  type = type ? type : "text";
  labelClassName = labelClassName ? labelClassName : "";

  let inputClasses = prependText ? " pl-7 " : "";

  if (appendIcon || appendText) {
    if (appendText && appendText.length > 4) {
      inputClasses += " pr-20";
    } else {
      inputClasses += " pr-12";
    }
  }

  const InputElement = (
    <input
      autoFocus={autoFocus}
      name={name}
      ref={reference ? (r: any) => reference(r) : register}
      type={type}
      defaultValue={defaultValue}
      value={value}
      id={inputId}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      onClick={onClick}
      onFocus={onFocus}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      step={step}
      min={min}
      max={max}
      autoComplete={autoComplete}
      className={
        "shadow-sm block w-full border-gray-300 rounded-md " +
        inputClasses +
        " " +
        (disabled ? " bg-gray-100" : "")
      }
    />
  );

  return (
    <div
      className={
        containerClassName
          ? containerClassName
          : labelInline
          ? "u-vertical-center flex-row space-x-4"
          : "mt-4 max-w-sm"
      }
    >
      {label && label.length > 0 && (
        <div className="flex justify-between">
          <Label htmlFor={htmlFor} className={labelClassName} noMargin={labelInline}>
            {label}
            {info && <InfoButton>{info}</InfoButton>}
          </Label>
          {optional && <span className="text-gray-500">(Optional)</span>}
        </div>
      )}
      <div className="u-vertical-center flex-row w-full" id={inputFieldId} style={inputFieldStyle}>
        <div className={"relative rounded-m w-full"}>
          {prependText && (
            <div className="absolute inset-y-0 left-0 pl-3 u-vertical-center pointer-events-none ">
              <span className="text-gray-500 sm:text-sm">{prependText}</span>
            </div>
          )}

          {InputElement}
          {appendIcon && (
            <div className="u-input-icon" id={appendIconId}>
              <FontAwesomeIcon icon={appendIcon} size="sm" />
            </div>
          )}
          {appendText && <div className="u-input-icon">{appendText}</div>}
        </div>
        {appendSelectProps && (
          <div className="-ml-2">
            <Select {...appendSelectProps} noMargin disabled />
          </div>
        )}
      </div>
      {validationError &&
        (errorMessage ? (
          <Message.Error>{errorMessage}</Message.Error>
        ) : (
          <Message.Error>{validationError.message}</Message.Error>
        ))}
    </div>
  );
}

export { Input };
