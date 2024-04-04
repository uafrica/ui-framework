import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IInputProps {
  label?: string;
  isLabelInline?: boolean;
  shouldOverlapLabel?: boolean;
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
  onKeyDown?: any;
  step?: any;
  min?: number;
  max?: number;
  maxLength?: number;
  autoComplete?: any;
  isDisabled?: boolean;
  reference?: any;
  placeholder?: string;
  id?: string;
  containerClassName?: string;
  errorMessage?: string;
  shouldAutoFocus?: any;
  isOptional?: any; // When boolean displays the text "optional" next to the label, when string displays string value
  isReadOnly?: boolean;
  inputClassName?: string;
  info?: any;
  inputFieldID?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  onAppendIconClick?: any;
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
  inputFieldStyle?: any;
  inputID?: string;
  onClearSearch?: Function;
  prependSelectProps?: any;
  prependTextSize?: string;
  showAsterisk?: boolean;
  hideArrows?: boolean;
  disableNumericInputScroll?: boolean; // Scrolling over a numeric input causes the input value to change
  dataTest?: string | undefined;
  pointer?: any;
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
