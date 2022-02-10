import {
  DatePicker,
  InfoButton,
  Input,
  PageHeading,
  SectionHeading,
  Switch,
  Select,
  Dropdown,
  Radio,
  Textarea
} from "../../../src";
import { useEffect, useState } from "react";

function Forms() {
  const [inlineInput, setInlineInput] = useState<boolean>(true);
  const [selection, setSelection] = useState<any>(null);

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  // display code blocks
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showInputInterface, setShowInputInterface] = useState<boolean>(false);
  const [showInputCode, setShowInputCode] = useState<boolean>(false);
  const [showRadioButtonCode, setShowRadioButtonCode] = useState<boolean>(false);
  const [showRadioGroupCode, setShowRadioGroupCode] = useState<boolean>(false);
  const [selectCode, setSelectCode] = useState<boolean>(false);
  const [dropdownCode, setDropdownCode] = useState<boolean>(false);

  // select components
  const [selectionOne, setSelectionOne] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedOne, setSelectedOne] = useState<{ label: string; value: string }>();

  const setSelectionOptions = () => {
    setTimeout(() => {
      return setSelectionOne([
        { label: "one", value: "oneVal" },
        { label: "two", value: "twoVal" },
        {
          label: "three",
          value: "threeVal"
        }
      ]);
    }, 500);
  };

  useEffect(() => {
    setSelectionOptions();
  }, []);

  // Render methods
  const InputPrice = () => (
    <>
      <div className="max-w-md my-4 flex">
        <Input
          label="Price"
          labelInline={inlineInput}
          appendText={"/kg"}
          prependText={"RRR"}
          inputClassName="pl-11"
        />
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
      <div className="mt-5">
        <Switch
          checked={showInputCode}
          onChange={() => setShowInputCode(!showInputCode)}
          label="Toggle input code example"
        />
      </div>
      {showInputCode && (
        <div className="mt-5 w-2/5">
          <pre>
            <code>{`  <Input
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
  />`}</code>
          </pre>
        </div>
      )}
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

  const TextareaField = () => (
    <div className="max-w-md my-4">
      <Textarea label={"Textarea"} />
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

  const SelectAndDropdown = () => (
    <div className="flex">
      <div className="my-4 w-1/2">
        <Select
          options={selectionOne}
          value={selectedOne}
          onChange={(val: { label: string; value: string }) => setSelectedOne(val)}
          label="Select one"
          labelInline
          placeholder="Single select"
        />
        <div className="mt-5">
          <Switch
            checked={selectCode}
            onChange={() => setSelectCode(!selectCode)}
            label="Show select code"
          />
        </div>

        {selectCode && (
          <div className="my-4 w-3/4">
            <pre>
              <code>{`<div className="my-4">
   <Select
     options={selectionOne}
     value={selectedOne}
     onChange={(val: { label: string; value: string }) => 
            setSelectedOne(val)}
     label="Select one"
     labelInline
     placeholder="Single select"
   />
</div>`}</code>
            </pre>
          </div>
        )}
      </div>
      <div className="my-4">
        <Dropdown.Menu icon="cog" title="dropdown options">
          <Dropdown.MenuItem
            icon="plus"
            title="Option 1"
            onClick={() => alert("Option 1 selected")}
          />
          <Dropdown.MenuItem
            icon="search"
            title="Option 2"
            onClick={() => alert("Option 2 selected")}
          />
          <Dropdown.MenuItem
            icon="truck"
            title="Option 3"
            onClick={() => alert("Option 3 selected")}
          />
          <Dropdown.MenuItem
            icon="money-bill"
            title="Option 4"
            onClick={() => alert("Option 4 selected")}
          />
        </Dropdown.Menu>

        <div>
          <div className="mt-5">
            <Switch
              checked={dropdownCode}
              onChange={() => setDropdownCode(!dropdownCode)}
              label="Show dropdown code"
            />
          </div>

          {dropdownCode && (
            <div className="my-4">
              <pre>
                <code>{`<Dropdown.Menu icon="cog" title="dropdown options">
    <Dropdown.MenuItem
       icon="plus"
       title="Option 1"
       onClick={() => alert("Option 1 selected")}
     />
     <Dropdown.MenuItem
       icon="search"
       title="Option 2"
       onClick={() => alert("Option 2 selected")}
     />
     <Dropdown.MenuItem
       icon="truck"
       title="Option 3"
       onClick={() => alert("Option 3 selected")}
     />
     <Dropdown.MenuItem
       icon="money-bill"
       title="Option 4"
       onClick={() => alert("Option 4 selected")}
     />
</Dropdown.Menu>`}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-5">
      <PageHeading>Form Components</PageHeading>
      <SectionHeading>Input and checkbox components</SectionHeading>
      <hr />
      <div className="mt-5">
        <Switch
          checked={showInputInterface}
          onChange={() => setShowInputInterface(!showInputInterface)}
          label="Show input interface"
        />
      </div>

      {showInputInterface && (
        <div className="w-1/4 mt-5">
          <pre>
            <code>{`interface IInputProps {
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

      <TextareaField />
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
        <div className="w-1/4 mt-5">
          <pre>
            <code>{`  <DatePicker
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
        </div>
      )}

      <div className="flex gap-10 my-4">
        {datePickerInput(fromDate, setFromDate, "From")}
        {datePickerInput(toDate, setToDate, "To")}
      </div>
      <SectionHeading>Select and dropdown components</SectionHeading>
      <hr />
      <SelectAndDropdown />

      <SectionHeading>Radio buttons and groups</SectionHeading>
      <hr />
      <div className="mt-4">
        <Radio.Button
          name="radio.button"
          labelRight={true}
          label="Right label radio button"
          onChange={(value: any) => {
            console.log(value);
          }}
        />
        <Radio.Button
          name="radio.button"
          labelLeft={true}
          label="Left label radio button"
          onChange={(value: any) => {
            console.log(value);
          }}
        />

        <div className="mt-5">
          <Switch
            checked={showRadioButtonCode}
            onChange={() => setShowRadioButtonCode(!showRadioButtonCode)}
            label="Toggle radio button code example"
          />
        </div>
        {showRadioButtonCode && (
          <div className="mt-5 w-2/5">
            <pre>
              <code>{`
              <Radio.Button
                name="radio.button"
                labelRight={true}
                label="Right label radio button"
                onChange={(value: any) => {
                  console.log(value);
                }}
              />
              <Radio.Button
                name="radio.button"
                labelLeft={true}
                label="Left label radio button"
                onChange={(value: any) => {
                  console.log(value);
                }}
              />`}</code>
            </pre>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Radio.Group
          name="radio.group"
          labelRight={true}
          options={["One", "Two", "Three"]}
          onChange={(option: string) => {
            console.log("Radio group selected ", option);
          }}
          title="Radio group"
        />

        <div className="mt-5">
          <Switch
            checked={showRadioGroupCode}
            onChange={() => setShowRadioGroupCode(!showRadioGroupCode)}
            label="Toggle radio group code example"
          />
        </div>
        {showRadioGroupCode && (
          <div className="mt-5 w-2/5">
            <pre>
              <code>{`
              <Radio.Group
                name="radio.group"
                labelRight={true}
                options={["One", "Two", "Three"]}
                onChange={(option: string) => {
                   console.log("Radio group selected ", option);
                  }}
                  title="Radio group"
               />`}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forms;
