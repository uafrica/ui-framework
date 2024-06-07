import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";

export interface IInput {
  label?: ReactNode;
  isLabelInline?: boolean;
  shouldOverlapLabel?: boolean;
  labelClassName?: string;
  htmlFor?: string;
  register?: any;
  name?: string;
  defaultValue?: string | number | ReadonlyArray<string>;
  value?: string | ReadonlyArray<string> | number;
  validationError?: any;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler;
  onClick?: MouseEventHandler | (() => void) | Function;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onKeyPress?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
  onKeyDown?: KeyboardEventHandler;
  step?: number | string;
  min?: number;
  max?: number;
  maxLength?: number;
  autoComplete?: string;
  isDisabled?: boolean;
  reference?: any;
  placeholder?: string;
  id?: string;
  containerClassName?: string;
  errorMessage?: string;
  shouldAutoFocus?: boolean;
  isOptional?: boolean; // When boolean displays the text "optional" next to the label, when string displays string value
  isReadOnly?: boolean;
  inputClassName?: string;
  info?: ReactNode;
  inputFieldID?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  onAppendIconClick?: MouseEventHandler | (() => void) | Function;
  appendIconColor?: string;
  appendText?: string;
  appendPadding?: string;
  appendSelectProps?: any;
  prependText?: string;
  prependPadding?: string;
  prependTextContainerClassName?: string;
  appendTextContainerClassName?: string;
  prependTextHasBackground?: boolean;
  appendTextHasBackground?: boolean;
  inputFieldStyle?: CSSProperties;
  inputID?: string;
  onClearSearch?: () => void;
  prependSelectProps?: any;
  prependTextSize?: string;
  showAsterisk?: boolean;
  hideArrows?: boolean;
  disableNumericInputScroll?: boolean; // Scrolling over a numeric input causes the input value to change
  dataTest?: string;
  pointer?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
}
