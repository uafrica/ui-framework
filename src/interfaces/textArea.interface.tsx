import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";

export interface ITextArea {
  label?: ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  fieldID?: string;
  className?: string;
  info?: ReactNode;
  id?: string;
  value?: string | ReadonlyArray<string> | number;
  defaultValue?: string | number | ReadonlyArray<string>;
  name?: string;
  isDisabled?: boolean;
  isOptional?: boolean;
  onChange?: ChangeEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  placeholder?: string;
  infoButton?: ReactNode;
  register?: any;
  validationError?: any;
  errorMessage?: any;
  isFixed?: boolean;
  rows?: number;
  maxLength?: number;
  dataTest?: string;
}
