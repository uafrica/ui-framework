import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoButton, Label, Message } from ".";

const defaultContainerClass = "mt-4 max-w-sm";

const inputBaseClass = "shadow-sm block w-full  border-gray-300 rounded-md";
const inputContainerBaseClass = "relative rounded-m";

// Interfaces
interface IInputProps {
  inputFieldClassName?: string;
  label?: string;
  htmlFor?: string;
  labelClassName?: string;
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
  containerClass?: string;
  errorMessage?: string;
  autoFocus?: any;
  optional?: boolean; // displays the text "optional" next to the label
  required?: boolean; // displays the text "*" next to the label
  readOnly?: boolean;

  info?: any;
  inputFieldId?: string;
  prependIcon?: any;
  prependIconClassName?: string;
  prependIconId?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  appendText?: string;
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
    prependIcon,
    prependIconClassName,
    prependIconId,
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
    onBlur,
    containerClass,
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
      className={inputBaseClass + (appendIcon ? " pr-10 " : "")}
    />
  );

  return (
    <div className={containerClass ? containerClass : defaultContainerClass}>
      {label && label.length > 0 && (
        <div className="flex justify-between">
          <Label htmlFor={htmlFor} className={labelClassName}>
            {label} {!optional && required && " *"}
            {info && <InfoButton>{info}</InfoButton>}
          </Label>
          {optional && <span className="text-gray-500">Optional</span>}
        </div>
      )}
      {prependIcon || appendIcon || appendText ? (
        <div className={inputFieldClassName} id={inputFieldId} style={inputFieldStyle}>
          {prependIcon && (prependIconClassName || prependIconId) ? (
            <span className={prependIconClassName} id={prependIconId}>
              {prependIcon}
            </span>
          ) : (
            prependIcon
          )}
          <div
            className={
              inputContainerBaseClass + " " + (inputFieldClassName ? inputFieldClassName : "w-xs")
            }
          >
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
