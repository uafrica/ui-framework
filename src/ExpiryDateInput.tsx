import { Label } from "./Label";
import { useEffect, useRef, useState } from "react";

interface IProps {
  value?: any;
  onChange: Function;
}
function ExpiryDateInput(props: IProps) {
  let { value } = props;
  let [expiryMonth, setExpiryMonth] = useState<string>();
  let [expiryYear, setExpiryYear] = useState<string>();
  let [expiryDate, setExpiryDate] = useState<any>({});
  const yearInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setExpiryMonth(value.month);
      setExpiryYear(value.year);
    }
  }, []);

  function handleDateChange(inputValue: any, type: string) {
    value = null;
    if (inputValue.length === 2) {
      yearInputRef.current?.focus();
    }
    inputValue = inputValue.replace(/\D/g, "");
    if (type == "month") {
      setExpiryMonth(inputValue);
      expiryDate.month = inputValue;
    } else {
      setExpiryYear(inputValue);
      expiryDate.year = inputValue;
    }

    setExpiryDate({ ...expiryDate });
    props.onChange({ ...expiryDate });
  }

  /* --------------------------------*/
  /* RENDER METHODS */
  /* --------------------------------*/

  function render() {
    return (
      <div>
        <Label>Expiry date</Label>
        <div className="flex rounded-md border border-gray-300 py-1 px-4">
          <input
            type="text"
            placeholder="MM"
            className="w-8 py-1 border-none shadow-none focus:ring-0 px-0 "
            value={expiryMonth}
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
            value={expiryYear}
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

  return render();
}

export { ExpiryDateInput };
