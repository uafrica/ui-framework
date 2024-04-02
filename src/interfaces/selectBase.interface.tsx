export interface ISelectBase {
  label?: any;
  isLabelInline?: boolean;
  shouldOverlapLabel?: boolean;
  labelClassName?: string;
  className?: string;
  containerClassName?: string;
  noMargin?: boolean;
  popoverWidth?: string;
  buttonWidth?: string;
  id?: string;
  value?: any;
  info?: any;
  onChange?: (value: any) => void;
  onClick?: () => void;
  onSearchBlur?: () => void;
  onSearchFocus?: () => void;
  isDisabled?: boolean;
  disableSearch?: boolean;
  placeholder?: any;
  customSelectionValue?: any; // Overrides placeholder and other selection text
  isMultiSelection?: boolean;
  buttons?: any; // If you want an add option buttons to the bottom of the list, add Button.Link elements
  onDelete?: (label: any, value: any) => void; // Renders a delete button next to each option
  allowDeselect?: boolean; // Single select mode does not allow for the deselection of an option by default, only switching to another option. override by setting this to true
  showAsterisk?: boolean;
  dataTest?: string | undefined;
  showAllButton?: boolean; // Conditionally display a button to show all available options
  showAllSelectedText?: boolean; // Show "All selected" if the options selected is equal to the amount of options in the array
  allSelectedText?: string | undefined; // Custom all selected text
  popoverHeight?: string;
  borderClassName?: string;
}
