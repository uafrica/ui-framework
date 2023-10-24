import { Label } from "./Label";
import { useRef, useState } from "react";

interface IProps {
  onChange: Function;
}
function ExpiryDateInput(props: IProps) {
  let [creditCardMonth, setCreditCardMonth] = useState<number>();
  let [creditCardYear, setCreditCardYear] = useState<number>();
  let [creditCardExpiryDate, setCreditCardExpiryDate] = useState<any>({});
  const yearInputRef = useRef<HTMLInputElement>(null);

  function handleDateChange(inputValue: any, type: string) {
    if (inputValue.length === 2) {
      yearInputRef.current?.focus();
    }
    const value = inputValue.replace(/\D/g, "");
    if (type == "month") {
      setCreditCardMonth(value);
      creditCardExpiryDate.month = value;
    } else {
      setCreditCardYear(value);
      creditCardExpiryDate.year = value;
    }

    setCreditCardExpiryDate({ ...creditCardExpiryDate });
    props.onChange({ ...creditCardExpiryDate });
  }

  /* --------------------------------*/
  /* RENDER METHODS */
  /* --------------------------------*/

  return (
    <div>
      <Label>Expiry date</Label>
      <div className="flex rounded-md border border-gray-300 py-1 px-4">
        <input
          type="text"
          placeholder="MM"
          className="w-8 py-1 border-none shadow-none focus:ring-0 px-0 "
          value={creditCardMonth}
          maxLength={2}
          onChange={(e: any) => {
            const inputValue = e.target.value;
            handleDateChange(inputValue, "month");
          }}
        />
        <span className="text-gray-600 pl-1 pr-2 py-1">/</span>
        <input
          type="text"
          placeholder="YY"
          className="w-8 py-1 border-none shadow-none focus:ring-0 px-0"
          value={creditCardYear}
          maxLength={2}
          onChange={(e: any) => {
            const inputValue = e.target.value;
            handleDateChange(inputValue, "year");
          }}
          ref={yearInputRef}
        />
      </div>
    </div>
  );
}

export { ExpiryDateInput };
