import { ReactNode } from "react";

export interface ICountrySelect {
  label?: ReactNode;
  allowedCountryCodes?: string[];
  allowOtherCountries?: boolean;
  isMultiSelection?: boolean;
  allowDeselect?: boolean;
  onChange?: (countryCodes: any) => void;
  value?: string;
  showAllSelectedCountries?: boolean; // Show selected countries under select (similar to how tags are shown)
  containerClassName?: string;
  selectedCountriesContainerClassName?: string;
  isReadOnly?: boolean;
  shouldOverlapLabel?: boolean;
}
