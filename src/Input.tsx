import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "./Select";
import { InfoButton } from "./InfoButton";
import { Label } from "./Label";
import { Message } from "./Message";
import { IInputProps } from "./interfaces/inputProps.interface";

function Input(props: IInputProps) {
  let {
    label,
    htmlFor,
    labelClassName,
    inputFieldID,
    isReadOnly,
    inputFieldStyle,
    placeholder,
    register,
    reference,
    type,
    name,
    defaultValue,
    value,
    validationError,
    inputID,
    appendIcon,
    appendText,
    appendPadding,
    appendIconId,
    onAppendIconClick,
    appendIconColor,
    isOptional,
    isDisabled,
    errorMessage,
    onChange,
    onClick,
    onFocus,
    prependText,
    prependPadding,
    onBlur,
    containerClassName,
    isLabelInline,
    shouldAutoFocus,
    onKeyPress,
    onKeyUp,
    step,
    min,
    max,
    maxLength,
    autoComplete,
    info,
    appendSelectProps,
    inputClassName,
    onClearSearch,
    prependSelectProps,
    prependTextSize,
    showAsterisk,
    hideArrows,
    disableNumericInputScroll,
    dataTest,
    inputMode
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
      autoFocus={shouldAutoFocus}
      name={name}
      ref={reference ? (r: any) => reference(r) : register}
      type={type}
      defaultValue={defaultValue}
      value={value}
      id={inputID}
      readOnly={isDisabled || isReadOnly} // if we make the input disabled then react-hooks-form doesn't submit the defaultValue https://twitter.com/bluebill1049/status/1300231640392716288
      onChange={onChange}
      onClick={onClick}
      onFocus={(e: any) => {
        if (!isDisabled) {
          e.target.placeholder = "";
          onFocus && onFocus(e);
        }
      }}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      onBlur={(e: any) => {
        if (!isDisabled) {
          if (placeholder) {
            e.target.placeholder = placeholder;
          }
          onBlur && onBlur(e);
        }
      }}
      step={step}
      min={min}
      max={max}
      maxLength={maxLength}
      autoComplete={autoComplete === "off" ? "something-chrome-does-not-know" : autoComplete} // setting autoComplete to off is not reliable
      className={
        "focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent shadow-sm block w-full border-gray-300 rounded-md " +
        inputClasses +
        " " +
        (isDisabled ? " bg-gray-100" : "")
      }
      onWheel={(e: any) => {
        if (disableNumericInputScroll) {
          e.target.blur();
        }
      }}
      data-test={dataTest}
      inputMode={inputMode ?? (type === "number" ? "decimal" : "text")}
    />
  );

  return (
    <div
      className={
        (hideArrows ? " no-arrows " : "") +
        (containerClassName
          ? containerClassName
          : isLabelInline
          ? "u-vertical-center flex-row space-x-4"
          : "mt-4 max-w-sm")
      }
    >
      {label && label.length > 0 && (
        <div className="flex justify-between">
          <Label htmlFor={htmlFor} className={labelClassName} noMargin={isLabelInline}>
            <span className="inline-block whitespace-nowrap">
              {label}
              {showAsterisk && " *"}
            </span>
            {info && <InfoButton>{info}</InfoButton>}
          </Label>
          {isOptional && (
            <span className="text-gray-500">
              {typeof isOptional === "string" ? isOptional : "(Optional)"}
            </span>
          )}
        </div>
      )}
      <div className="u-vertical-center flex-row w-full" id={inputFieldID} style={inputFieldStyle}>
        {prependSelectProps && (
          <div className="-mr-2 z-10">
            <Select {...prependSelectProps} noMargin isDisabled={isDisabled} />
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
              <span
                className={"text-gray-500 " + (prependTextSize ? prependTextSize : "sm:text-sm")}
              >
                {prependText}
              </span>
            </div>
          )}

          {InputElement}
          {(appendIcon || onClearSearch) && (
            <div className={"absolute inset-y-0 right-0 mr-3 flex items-center"}>
              {appendIcon && (
                <div
                  className={
                    onAppendIconClick
                      ? " cursor-pointer " + (appendIconColor ?? "text-primary")
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
            <Select {...appendSelectProps} noMargin isDisabled={isDisabled} />
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
