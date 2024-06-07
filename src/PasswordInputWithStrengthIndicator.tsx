import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import React, { ChangeEventHandler, useState } from "react";
import {
  ICriteria,
  IPassowrdInputWithStrengthIndicator,
} from "./interfaces/passwordInputWithStrengthIndicator";

/* -------------------------------- */
/* Example of extraCriteria prop */
/*

  ExtraCriteria={[
    {
      description: "Must contain no spaces",
      check: (password: string) => !/\s/.test(password)
    },
    {
    description: 'Must be 4 characters or more',
    check: (password: string) => password.length >= 4,
  }
  ]}
  
  */
/* -------------------------------- */

function PasswordInputWithStrengthIndicator(
  props: IPassowrdInputWithStrengthIndicator
) {
  let {
    requiredPasswordLength,
    shouldContainUppercase = true,
    shouldContainLowercase = true,
    shouldContainNumbers = true,
    shouldContainSpecialCharacters = true,
    inputLabel,
    extraCriteria,
    passwordValue,
    shouldAutoFocus,
  } = props;
  const [password, setPassword] = useState<string>(passwordValue ?? "");
  let [showPassword, setShowPassword] = useState<boolean>(false);

  function calculateScore() {
    let criteriaMet = 0;
    let totalCriteria = 1;
    const lengthScore = password.length >= requiredPasswordLength ? 1 : 0;
    const lowercaseScore = shouldContainLowercase
      ? /[a-z]/.test(password)
        ? 1
        : 0
      : 0;
    const uppercaseScore = shouldContainUppercase
      ? /[A-Z]/.test(password)
        ? 1
        : 0
      : 0;
    const numbersScore = shouldContainNumbers
      ? /\d/.test(password)
        ? 1
        : 0
      : 0;
    const specialCharsScore = shouldContainSpecialCharacters
      ? /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
        ? 1
        : 0
      : 0;

    totalCriteria += shouldContainLowercase ? 1 : 0;
    totalCriteria += shouldContainUppercase ? 1 : 0;
    totalCriteria += shouldContainNumbers ? 1 : 0;
    totalCriteria += shouldContainSpecialCharacters ? 1 : 0;

    criteriaMet =
      lengthScore +
      lowercaseScore +
      uppercaseScore +
      numbersScore +
      specialCharsScore;

    if (extraCriteria) {
      totalCriteria += extraCriteria.length;
      const metCriteriaArray = extraCriteria.filter((criteria: ICriteria) =>
        criteria.check(password)
      );
      criteriaMet += metCriteriaArray.length;
    }

    return (criteriaMet / totalCriteria) * 100;
  }

  function getUnmetCriteriaMessages() {
    let criteriaMessages = [
      {
        message: `Must be ${requiredPasswordLength} characters or more`,
        met: password.length >= requiredPasswordLength,
      },
      {
        message: "Must contain an uppercase letter",
        met: shouldContainUppercase && /[A-Z]/.test(password),
      },
      {
        message: "Must contain a lowercase letter",
        met: shouldContainLowercase && /[a-z]/.test(password),
      },
      {
        message: "Must contain a number",
        met: shouldContainNumbers && /\d/.test(password),
      },
      {
        message: "Can contain a special character",
        met:
          shouldContainSpecialCharacters &&
          /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password),
      },
    ];

    if (extraCriteria) {
      const extraCriteriaMessages = extraCriteria.map((criteria) => ({
        message: criteria.description,
        met: criteria.check(password),
      }));

      criteriaMessages.push(...extraCriteriaMessages);
    }

    return criteriaMessages;
  }

  function getStrengthLabel() {
    const strength = calculateScore();

    if (password !== "") {
      if (strength < 25) return "Weak";
      if (strength < 75) return "Okay";
      if (strength < 100) return "Good";
      return "Strong";
    }
    return "";
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    props.onChange(e);
  }

  /* -------------------------------- */
  /* RENDER METHODS */
  /* -------------------------------- */

  function renderStrengthBars() {
    const score = calculateScore();

    let barColorClass = "";
    let barsToColor = 0;

    let bars = [];

    if (password !== "") {
      if (score >= 100) {
        barColorClass = "bg-green-500";
        barsToColor = 4;
      } else if (score >= 75) {
        barColorClass = "bg-blue-500";
        barsToColor = 3;
      } else if (score >= 25) {
        barColorClass = "bg-yellow-500";
        barsToColor = 2;
      } else if (score > 0 && score < 25) {
        barColorClass = "bg-red-500";
        barsToColor = 1;
      }
    }

    for (let i = 1; i <= 4; i++) {
      let barColor = "bg-gray-200";
      if (i <= barsToColor) {
        barColor = barColorClass;
      }
      bars.push(
        <div
          key={i}
          className={`h-1 mx-1  ${barColor}`}
          style={{
            flex: 1,
          }}
        ></div>
      );
    }

    return bars;
  }

  function render() {
    return (
      <div className="w-full">
        <label className="block font-semibold mb-1">
          {inputLabel ? inputLabel : "Password"}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full py-2 px-3 rounded-md border focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent border-gray-300"
            onChange={handlePasswordChange}
            value={password}
            autoFocus={shouldAutoFocus}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon
              icon={showPassword ? "eye-slash" : "eye"}
              size="sm"
            />
          </span>
        </div>
        <div className="mt-2">
          <div className="h-1 flex justify-between">{renderStrengthBars()}</div>
        </div>
        <div className="flex justify-end items-center mt-2">
          <div className="text-sm justify-end items-center mt-2">
            {getStrengthLabel()}
          </div>
        </div>
        {getUnmetCriteriaMessages().map((criteria, index) => (
          <div key={index} className="text-sm">
            <FontAwesomeIcon
              icon={criteria.met ? "check-circle" : "times-circle"}
              color={criteria.met ? "green" : "red"}
              className="mr-4"
            />
            {criteria.message}
          </div>
        ))}
      </div>
    );
  }
  return render();
}

export { PasswordInputWithStrengthIndicator };
