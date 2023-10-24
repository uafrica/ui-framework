import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  TextArea,
  Button,
  Checkbox,
  MobileNumberSelect,
  LabelWithValue,
  ExpiryDateInput
} from "../../../src";
import { useEffect, useState } from "react";
import { withValidation } from "../../../src/utils/validationUtils";

function Forms(props: any) {
  const { validation } = props;
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

  const [phoneNumber, setPhoneNumber] = useState<string>("764535606");
  let [creditCardExpiryDate, setCreditCardExpiryDate] = useState<any>({});

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

  /* --------------------------------*/
  /* RENDER METHODS */
  /* --------------------------------*/
  function InputPrice() {
    return (
      <>
        <div className="max-w-md my-4 flex">
          <Input
            label="Price"
            placeholder="0.00"
            onBlur={(e: any) => console.log("value blurred", e.target.value)}
            isLabelInline={inlineInput}
            defaultValue=""
            appendText="/kg"
            prependText="RRR"
            name="price"
            register={validation.register({
              required: {
                value: true,
                message: "This field is required"
              }
            })}
            validationError={
              validation.errors && validation.errors.price && validation.errors.price
            }
            inputClassName="pl-11"
          />
          {inlineInput && (
            <div className="flex items-center">
              <InfoButton>State has been applied with inline input component</InfoButton>
            </div>
          )}
        </div>

        <div className="my-4">
          <Button.Primary
            title="Save"
            onClick={props.validation.handleSubmit(() => {
              alert("Fake saved");
            })}
          />
        </div>

        <Switch
          isChecked={inlineInput}
          onChange={() => setInlineInput(!inlineInput)}
          label="Toggle inline input"
          containerClassName={"check-here-class"}
          info={!inlineInput ? "This will not work without state" : ""}
        />
        <div className="mt-5">
          <Switch
            isChecked={showInputCode}
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
    isLabelInline
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
  }

  const SelectInput = () => (
    <div className="max-w-md my-4">
      <Input
        prependText="R"
        label="Price"
        isLabelInline
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
      <TextArea label={"Textarea"} />
    </div>
  );

  const datePickerInput = (val: any, setVal: any, label: string) => {
    return (
      <DatePicker
        label={label}
        isLabelInline
        placeholder={`${label} Date`}
        dateFormat={"yyyy-MM-DD"}
        selectedDate={val}
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
          isLabelInline
          placeholder="Single select"
        />
        <div className="mt-5">
          <Switch
            isChecked={selectCode}
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
     isLabelInline
     placeholder="Single select"
   />
</div>`}</code>
            </pre>
          </div>
        )}
      </div>
      <div className="my-4">
        <div className="flex">
          <Button.Primary leftRounded={true} title={"Save"} />
          <Dropdown.Menu title="dropdown options" padding={"pr-4 pl-2"} square={true}>
            <Dropdown.MenuItem
              icon="plus"
              appendHTML={<FontAwesomeIcon icon="crown" color="#FFB600" />}
              isLoading={true}
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
        </div>

        <div>
          <div className="mt-5">
            <Switch
              isChecked={dropdownCode}
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
      <Checkbox isChecked={true} textColor="red-600" />
      <Checkbox isDisabled={true} label="Disabled" />
      <MobileNumberSelect
        allowedCountryCodes={["ZA", "TO"]}
        label="Mobile number"
        name="mobile_number"
        value={phoneNumber}
        onChange={(value: string) => setPhoneNumber(value)}
        validation={validation}
        validationError={validation.errors && validation.errors.mobile_number}
      />
      <LabelWithValue label="Phone" value={phoneNumber} />
      <div className="mt-5">
        <Switch
          isChecked={showInputInterface}
          onChange={() => setShowInputInterface(!showInputInterface)}
          label="Show input interface"
        />
      </div>

      {showInputInterface && (
        <div className="w-1/4 mt-5">
          <pre>
            <code>{`interface IInputProps {
  label?: string;
  isisLabelInline?: boolean;
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
  isDisabled?: boolean;
  reference?: any;
  placeholder?: string;
  id?: string;
  containerClassName?: string;
  errorMessage?: string;
  shouldAutoFocus?: boolean;
  isOptional?: boolean;
  isReadOnly?: boolean;
  info?: any;
  inputFieldID?: string;
  appendIcon?: IconProp;
  appendIconID?: string;
  appendText?: string;
  appendSelectProps?: any;
  prependText?: string;
  inputFieldStyle?: any;
  inputID?: string;
  }`}</code>
          </pre>
        </div>
      )}
      <ExpiryDateInput
        value={{ month: "01", year: "24" }}
        onChange={(value: any) => {
          setCreditCardExpiryDate(value);
          console.log(creditCardExpiryDate);
        }}
      />
      <InputPrice />

      <SelectInput />

      <TextareaField />
      <SectionHeading>Date picker</SectionHeading>
      <hr />
      <div className="mt-5">
        <Switch
          isChecked={showDatePicker}
          onChange={() => setShowDatePicker(!showDatePicker)}
          label="Show date picker code"
        />
      </div>
      {showDatePicker && (
        <div className="w-1/4 mt-5">
          <pre>
            <code>{`  <DatePicker
    label={"date"}
    isLabelInline
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
      <Dropdown.Menu title={"New dropdown"}>
        <Dropdown.MenuItem title={"Item 1"} onClick={() => alert("one")} closeOnClick={false} />
        <Dropdown.MenuItem title={"Item 2"} onClick={() => alert("two")} closeOnClick={true} />
      </Dropdown.Menu>

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
            isChecked={showRadioButtonCode}
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
            isChecked={showRadioGroupCode}
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

export default withValidation(Forms);
