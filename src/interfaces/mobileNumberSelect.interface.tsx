import { ReactNode } from "react";

export interface IMobileNumberSelect {
  allowedCountryCodes?: string[];
  allowOtherCountries?: boolean;
  defaultCountryCode?: string;
  label?: ReactNode;
  shouldOverlapLabel?: boolean;
  onChange?: (mobileNumber: string | null) => void;
  value?: string;
  isReadOnly?: boolean;
  validationError?: any;
  errorMessage?: any;
  name?: string;
  validation?: any;
  isRequired?: boolean;
  mobileNumberRegex?: boolean;
  showAsterisk?: boolean;
}
