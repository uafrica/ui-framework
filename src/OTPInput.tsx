import React, { useEffect, useRef, useState } from "react";
import { Input } from "./Input";

function OTPInput(props: { length: number; onChange: (otp: string) => void }) {
  const { length } = props;
  const [otpArray, setOTPArray] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement>>([]);

  useEffect(() => {
    document.addEventListener("paste", handlePaste, false);
    return () => {
      document.removeEventListener("paste", handlePaste, false);
    };
  }, []);

  useEffect(() => {
    if (focusedIndex < length) {
      inputRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  function handlePaste() {
    navigator.clipboard.readText().then(
      (clipText) => {
        setOTPArray(clipText.split(""));
      },
      (err) => {
        console.error("Failed to read clipboard contents: ", err);
      }
    );
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && index > 0 && otpArray[index] === "") {
      setFocusedIndex(index - 1);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;

    let newArray = [...otpArray];

    if (value.length === 1) {
      newArray[index] = value;
      setFocusedIndex(index + value.length);
    } else if (value.length > 1) {
      newArray = [];
      for (let i = 0; i < value.length && i < length; i++) {
        newArray[i] = value[i];
        setFocusedIndex(i + 1);
      }
    } else if (value.length === 0) {
      newArray[index] = "";
    }

    setOTPArray([...newArray]);

    props.onChange(newArray.join(""));
  }

  function render() {
    return (
      <div className="flex flex-row space-x-4">
        {Array.from({ length: length }).map((_, index) => (
          <Input
            inputClassName="text-center"
            containerClassName="w-12"
            key={index}
            reference={(el: any) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            value={otpArray[index] || ""}
            onChange={(e: any) => handleChange(e, index)}
            onKeyDown={(e: any) => handleKeyDown(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
          />
        ))}
      </div>
    );
  }

  return render();
}

export { OTPInput };
