export interface IPassowrdInputWithStrengthIndicator {
  requiredPasswordLength: number;
  shouldContainUppercase?: boolean;
  shouldContainLowercase?: boolean;
  shouldContainNumbers?: boolean;
  shouldContainSpecialCharacters?: boolean;
  inputLabel?: string;
  extraCriteria?: ICriteria[];
  onChange: (e: any) => void;
  passwordValue?: string;
  shouldAutoFocus?: boolean;
}

export interface ICriteria {
  description: string;
  check: (password: string) => boolean;
}
