import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IInputProps {
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
  maxLength?: number;
  autoComplete?: any;
  disabled?: boolean;
  reference?: any;
  placeholder?: string;
  id?: string;
  containerClassName?: string;
  errorMessage?: string;
  autoFocus?: any;
  optional?: any; // when boolean displays the text "optional" next to the label, when string displays string value
  readOnly?: boolean;
  inputClassName?: string;
  info?: any;
  inputFieldId?: string;
  appendIcon?: IconProp;
  appendIconId?: string;
  onAppendIconClick?: any;
  appendIconColor?: string;
  appendText?: string;
  appendPadding?: string;
  appendSelectProps?: any;
  prependText?: string;
  prependPadding?: string;
  inputFieldStyle?: any;
  inputId?: string;
  onClearSearch?: Function;
  prependSelectProps?: any;
  prependTextSize?: string;
  showAsterisk?: boolean;
  noArrows?: boolean;
  disableNumericInputScroll?: boolean; // scrolling over a numeric input causes the input value to change
  pointer?: boolean;
  dataTest?: string | undefined;
}