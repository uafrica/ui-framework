import { DatePicker, InfoButton, Input, PageHeading, SectionHeading, Switch } from "../../../src";
import { useState } from "react";

function Forms() {
  const [inlineInput, setInlineInput] = useState<boolean>(true);
  const [selection, setSelection] = useState<any>(null);

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  // display code blocks
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showInputInterface, setShowInputInterface] = useState<boolean>(false);

  // Render methods
  const InputPrice = () => (
    <>
      <div className="max-w-md my-4 flex">
        <Input label="Price" labelInline={inlineInput} appendText={"/kg"} prependText={"R"} />
        {inlineInput && (
          <div className="flex items-center">
            <InfoButton>State has been applied with inline input component</InfoButton>
          </div>
        )}
      </div>

      <Switch
        checked={inlineInput}
        onChange={() => setInlineInput(!inlineInput)}
        label="Toggle inline input"
        info={!inlineInput ? "This will not work without state" : ""}
      />
    </>
  );

  const SelectInput = () => (
    <div className="max-w-md my-4">
      <Input
        prependText="R"
        label="Price"
        labelInline
        appendSelectProps={{
          popoverWidth: "w-96",
          buttonWidth: "w-24",
          onChange: (val: any) => setSelection(val),
          placeholder: selection ? selection : "R/kg",
          options: [
            { label: "per kg", value: "R/kg" },
            { label: "per g", value: "R/g" }
          ]
        }}
      />
    </div>
  );

  const datePickerInput = (val: any, setVal: any, label: string) => {
    return (
      <DatePicker
        label={label}
        labelInline
        placeholder={`${label} Date`}
        dateFormat={"yyyy-MM-DD"}
        selected={val}
        onChange={(date: any) => {
          setVal(date);
        }}
      />
    );
  };

  return (
    <div className="mt-5">
      <PageHeading>Form Components</PageHeading>
      <SectionHeading>Input and checkbox components</SectionHeading>
      <hr />
      <Switch
        checked={showInputInterface}
        onChange={() => setShowInputInterface(!showInputInterface)}
      />
      {showInputInterface && (
        <div style={{ width: "40%" }}>
          <pre>
            <code>{`
        interface IInputProps {
          label?: string;
          labelInline?: boolean;
          labelClassName?: string;
          htmlFor?: string;
          register?: any;
          name?: string;
          defaultValue?: any;
          value?: any;
          validationError?: any;
          type?: string;
          onChange?: any;
          onFocus?: any;
          onBlur?: any;
          onKeyPress?: any;
          onKeyUp?: any;
          step?: number;
          min?: number;
          max?: number;
          autoComplete?: any;
          disabled?: boolean;
          reference?: any;
          placeholder?: string;
          id?: string;
          containerClassName?: string;
          errorMessage?: string;
          autoFocus?: any;
          optional?: boolean;
          readOnly?: boolean;

          info?: any;
          inputFieldId?: string;
          appendIcon?: IconProp;
          appendIconId?: string;
          appendText?: string;
          appendSelectProps?: any;
          prependText?: string;
          inputFieldStyle?: any;
          inputId?: string;
        }`}</code>
          </pre>
        </div>
      )}
      <InputPrice />

      <SelectInput />
      <SectionHeading>Date picker</SectionHeading>
      <hr />
      <div className="mt-5">
        <Switch
          checked={showDatePicker}
          onChange={() => setShowDatePicker(!showDatePicker)}
          label="Show date picker code"
        />
      </div>
      {showDatePicker && (
        <pre>
          <code>{`
            <DatePicker
              label={"date"}
              labelInline
              placeholder={"Date"}
              dateFormat={"yyyy-MM-DD"}
              selected={"date"}
              onChange={"(date: any) => {
                "setDate(date)";
            }}
          />`}</code>
        </pre>
      )}

      <div className="flex gap-10 mt-5">
        {datePickerInput(fromDate, setFromDate, "From")}
        {datePickerInput(toDate, setToDate, "To")}
      </div>
    </div>
  );
}

export default Forms;
