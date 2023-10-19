import * as countryUtils from "./utils/countryUtils";
import { CountrySelect } from "./CountrySelect";
import { ICountry } from "./interfaces/country.interface";
import { Input } from "./Input";
import { Label } from "./Label";
import { useEffect, useState } from "react";
import { Message } from "./Message";

function MobileNumberSelect(props: {
  allowedCountryCodes?: string[];
  allowOtherCountries?: boolean;
  defaultCountryCode?: string;
  label?: any;
  onChange?: Function;
  value?: any;
  isReadOnly?: boolean;
  validationError?: any;
  errorMessage?: any;
  name?: string;
  validation?: any;
  isRequired?: boolean;
  mobileNumberRegex?: boolean;
  showAsterisk?: boolean;
}) {
  let {
    allowedCountryCodes,
    allowOtherCountries,
    value,
    label,
    defaultCountryCode,
    isReadOnly,
    validationError,
    errorMessage,
    name,
    validation,
    isRequired,
    mobileNumberRegex,
    showAsterisk
  } = props;

  const shouldValidate = validation && name;
  const validationRegex = /^\d{9}$/;

  const validCountries: ICountry[] = allowedCountryCodes
    ? countryUtils.getAllCountriesInListOfCodes(allowedCountryCodes, allowOtherCountries)
    : countryUtils.getAllCountries(allowOtherCountries);

  let [selectedCountry, setSelectedCountry] = useState<any>();
  let [mobileNumber, setMobileNumber] = useState<string>();

  useEffect(() => {
    let { number, country } = cleanReceivedMobileNumber(value);

    if (mobileNumber !== number) {
      setMobileNumber(number);
      setSelectedCountry(country);
    }
  }, [value]);

  // Occurs when either the mobile number or the country changes.
  // Not making use of an useEffect here because it competes with the [value] useEffect above.
  function onChange(_mobileNumber: string | undefined, selectedCountry: ICountry | null) {
    if (props.onChange) {
      if (_mobileNumber) {
        if (selectedCountry && value !== selectedCountry.dialCode + _mobileNumber) {
          props.onChange(selectedCountry.dialCode + _mobileNumber);
        }
      } else {
        props.onChange("");
      }
    }
  }

  function cleanReceivedMobileNumber(value: any) {
    let defaultCountry = countryUtils.getCountryByCode(
      defaultCountryCode ?? "ZA",
      allowOtherCountries
    );

    let mobileNumber = "";
    let mobileNumberCountry: ICountry | null = defaultCountry;
    if (!value) {
      // do nothing
    } else {
      mobileNumber = value.toString().trim();
      if (mobileNumber.indexOf("0") === 0) {
        // remove leading 0, country is assumed to be default country
        mobileNumber = mobileNumber.slice(1);
        mobileNumberCountry = defaultCountry;
      } else if (mobileNumber.indexOf("+") === 0) {
        let wasFound = false;
        validCountries.forEach(validCountry => {
          if (mobileNumber.indexOf(validCountry.dialCode) === 0) {
            wasFound = true;
            mobileNumber = mobileNumber.slice(validCountry.dialCode.length);
            mobileNumberCountry = validCountry;
          }
        });

        if (!wasFound) {
          // if no matching dial code found, remove "+" and deselect country
          mobileNumberCountry = null;
          mobileNumber = mobileNumber.slice(1);
        }
      }
    }

    if (mobileNumber.indexOf("0") === 0) {
      // mobile number should not start with 0 anymore
      mobileNumber = mobileNumber.slice(1);
    }

    if (shouldValidate) {
      validation.setValue(name, mobileNumber);
    }
    return { number: mobileNumber, country: mobileNumberCountry };
  }

  function onCountryChanged(countryCode: string | null) {
    let newSelectedCountry = null;
    if (countryCode) {
      newSelectedCountry = countryUtils.getCountryByCode(countryCode, allowOtherCountries);
    }
    setSelectedCountry(newSelectedCountry);
    onChange(mobileNumber, newSelectedCountry);
  }

  function render() {
    return (
      <div className="mt-4">
        {label && (
          <Label>
            <span className="inline-block whitespace-nowrap">
              {label}
              {showAsterisk && " *"}
            </span>
          </Label>
        )}
        <div className="flex flex-row space-x-4">
          <CountrySelect
            allowOtherCountries={allowOtherCountries}
            isReadOnly={isReadOnly}
            containerClassName={selectedCountry ? "w-16" : "w-24"}
            allowedCountryCodes={allowedCountryCodes}
            value={selectedCountry?.code}
            onChange={onCountryChanged}
          />
          <Input
            hideArrows
            name={name}
            isReadOnly={isReadOnly}
            containerClassName="w-full"
            disableNumericInputScroll
            prependPadding="pl-14"
            prependTextSize="text-base"
            isLabelInline
            prependText={selectedCountry?.dialCode}
            value={shouldValidate ? undefined : mobileNumber ?? ""}
            defaultValue={shouldValidate ? value : undefined}
            onChange={(e: any) => {
              let value = e.target.value.replace("+", "");
              setMobileNumber(value);
              onChange(value, selectedCountry);
            }}
            register={
              validation &&
              validation.register({
                required: {
                  value: isRequired,
                  message: "This field is required"
                },
                pattern: {
                  value: mobileNumberRegex ?? validationRegex,
                  message: "Invalid mobile number"
                }
              })
            }
          />
        </div>
        <div>
          {validationError &&
            (errorMessage ? (
              <Message.Error>{errorMessage}</Message.Error>
            ) : (
              <Message.Error>{validationError.message}</Message.Error>
            ))}
        </div>
      </div>
    );
  }
  return render();
}

export { MobileNumberSelect };
