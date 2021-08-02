import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoButton } from "./InfoButton";
import { Label } from "./Label";
import { Message } from "./Message";

const inputBaseClass = "shadow-sm block w-full border-gray-300 rounded-md";
const inputContainerBaseClass = "relative rounded-m";

// Interfaces
interface IInputProps {
  inputFieldClassName?: string;
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
  onFocus?: any;
  onBlur?: any;
  onKeyPress?: any;
  onKeyUp?: any;
  step?: number;
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
  required?: boolean; // displays the text "*" next to the label
  readOnly?: boolean;

  info?: any;
  inputFieldId?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  appendText?: string;
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
    inputFieldClassName,
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
    required
  } = props;

  type = type ? type : "text";
  labelClassName = labelClassName ? labelClassName : "";
  inputFieldClassName = inputFieldClassName ? inputFieldClassName : "";

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
        inputBaseClass + (appendIcon || appendText ? " pr-10 " : "") + (prependText ? " pl-7 " : "")
      }
    />
  );

  let _containerClassName = "mt-4 max-w-sm";

  if (labelInline) {
    _containerClassName = "flex flex-row items-center space-x-4";
  }

  if (containerClassName) {
    _containerClassName = containerClassName;
  }

  return (
    <div className={_containerClassName}>
      {label && label.length > 0 && (
        <div className="flex justify-between">
          <Label htmlFor={htmlFor} className={labelClassName} noMargin={labelInline}>
            {label} {!optional && required && " *"}
            {info && <InfoButton>{info}</InfoButton>}
          </Label>
          {optional && <span className="text-gray-500">Optional</span>}
        </div>
      )}
      {prependText || appendIcon || appendText ? (
        <div className={inputFieldClassName} id={inputFieldId} style={inputFieldStyle}>
          <div
            className={
              inputContainerBaseClass + " " + (inputFieldClassName ? inputFieldClassName : "w-xs")
            }
          >
            {prependText && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                <span className="text-gray-500 sm:text-sm">{prependText}</span>
              </div>
            )}

            {InputElement}
            {appendIcon && (
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"
                id={appendIconId}
              >
                <FontAwesomeIcon icon={appendIcon} size="sm" />
              </div>
            )}
            {appendText && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                {appendText}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={
            inputContainerBaseClass + " " + (inputFieldClassName ? inputFieldClassName : "w-xs")
          }
        >
          {InputElement}
        </div>
      )}
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
