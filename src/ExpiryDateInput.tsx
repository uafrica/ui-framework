import { Label } from "./Label";
// @ts-ignore
import React, { useRef } from "react";

interface IProps {
  value: { month: string; year: string };
  onChange: (value: { month: string; year: string }) => void;
}
function ExpiryDateInput(props: IProps) {
  const { value } = props;

  const yearInputRef = useRef<HTMLInputElement>(null);

  /* -------------------------------- */
  /* RENDER METHODS */
  /* -------------------------------- */

  function render() {
    return (
      <div>
        <Label>Expiry date</Label>
        <div className="flex rounded-md border border-gray-300 py-1 px-4">
          <input
            type="text"
            placeholder="MM"
            className="w-8 py-1 border-none shadow-none focus:ring-0 px-0 "
            value={value.month}
            maxLength={2}
            onChange={(e: any) => {
              let inputValue = e.target.value;
              if (inputValue.length === 2) {
                yearInputRef.current?.focus();
              }
              value.month = inputValue.replace(/\D/g, "");
              props.onChange({ ...value });
            }}
          />
          <span className="text-gray-600 pl-1 pr-2 py-1">/</span>
          <input
            type="text"
            placeholder="YY"
            className="w-8 py-1 border-none shadow-none focus:ring-0 px-0"
            value={value.year}
            maxLength={2}
            onChange={(e: any) => {
              let inputValue = e.target.value;
              value.year = inputValue.replace(/\D/g, "");
              props.onChange({ ...value });
            }}
            ref={yearInputRef}
          />
        </div>
      </div>
    );
  }

  return render();
}

export { ExpiryDateInput };
