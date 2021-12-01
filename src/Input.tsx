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
  inputClassName?: string;
  info?: any;
  inputFieldId?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  onAppendIconClick?: any;
  appendText?: string;
  appendPadding?: string;
  appendSelectProps?: any;
  prependText?: string;
  prependPadding?: string;
  inputFieldStyle?: any;
  inputId?: string;
  onClearSearch?: Function;
  prependSelectProps?: any;
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
    appendPadding,
    appendIconId,
    onAppendIconClick,
    optional,
    disabled,
    errorMessage,
    onChange,
    onClick,
    onFocus,
    prependText,
    prependPadding,
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
    appendSelectProps,
    inputClassName,
    onClearSearch,
    prependSelectProps
  } = props;

  type = type ? type : "text";
  labelClassName = labelClassName ? labelClassName : "";

  // @ts-ignore
  let inputClasses = prependPadding ? ` ${prependPadding} ` : prependText ? ` pl-7 ` : "";

  if (inputClassName) {
    inputClasses = inputClassName;
  }

  if (appendPadding) {
    inputClasses += ` ${appendPadding} `;
  } else if (appendIcon || appendText || onClearSearch) {
    if (onClearSearch) {
      inputClasses += " pr-20";
    } else if (appendText && appendText.length > 4) {
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
        {prependSelectProps && (
          <div className="-mr-2 z-50">
            <Select {...prependSelectProps} noMargin disabled={disabled} />
          </div>
        )}
        <div className={"relative rounded-m w-full"}>
          {prependText && (
            <div
              className={
                "absolute inset-y-0 left-0 pl-3 u-vertical-center " +
                (onAppendIconClick ? "" : " pointer-events-none")
              }
            >
              <span className="text-gray-500 sm:text-sm">{prependText}</span>
            </div>
          )}

          {InputElement}
          {(appendIcon || onClearSearch) && (
            <div className={"absolute inset-y-0 right-0 mr-3 flex items-center"}>
              {appendIcon && (
                <div
                  className={
                    onAppendIconClick
                      ? " cursor-pointer text-primary"
                      : " pointer-events-none text-gray-400"
                  }
                  id={appendIconId}
                  onClick={onAppendIconClick ? onAppendIconClick : undefined}
                >
                  <FontAwesomeIcon icon={appendIcon} size="sm" />
                </div>
              )}
              {appendIcon && onClearSearch && (
                <div className="mx-2 pointer-events-none text-gray-200">|</div>
              )}
              {onClearSearch && (
                <div
                  title="Clear search"
                  className="cursor-pointer text-gray-400 "
                  onClick={() => {
                    if (onClearSearch) {
                      onClearSearch();
                    }
                  }}
                >
                  <FontAwesomeIcon icon={"times"} size="sm" />
                </div>
              )}
            </div>
          )}
          {appendText && (
            <div
              className={
                "absolute inset-y-0 right-0 mr-3 flex items-center text-gray-400 pointer-events-none"
              }
            >
              {appendText}
            </div>
          )}
        </div>
        {appendSelectProps && (
          <div className="-ml-2">
            <Select {...appendSelectProps} noMargin disabled={disabled} />
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
