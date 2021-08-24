import { useState } from "react";
import {
  Checkbox,
  DatePicker,
  Input,
  Select,
  SkeletonLoader,
  Switch,
  Textarea,
  Button
} from "../../src";

function CornelScratchPad() {
  let [checkboxTicked, setCheckboxTicked] = useState(false);
  let [switchTicked, setSwitchTicked] = useState(false);
  let [selectValue, setSelectValue] = useState([]);
  let [multiSelectValue, setMultiSelectValue] = useState([]);

  return (
    <div>
      <div className="max-w-sm my-4">
        <Input
          prependText="R"
          label="Price"
          labelInline
          appendSelectProps={{
            popoverWidth: "w-96",
            buttonWidth: "w-24",
            placeholder: "R/Kg",
            options: [
              { label: "Option 1", value: 1 },
              { label: "Option 2", value: 2 }
            ]
          }}
        />
      </div>
      <div className="my-4">
        <Select
          placeholder="Select an option"
          value={selectValue}
          onChange={(newValue: any) => setSelectValue(newValue)}
          options={[
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 }
          ]}
        />
      </div>

      <div className="my-4">
        <Select
          placeholder="Multiselect"
          value={multiSelectValue}
          multiSelection
          onChange={(newValue: any) => setMultiSelectValue(newValue)}
          options={[
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 }
          ]}
          buttons={<Button.Link title="Save current filters" onClick={() => {}} />}
        />
      </div>

      <Switch
        label="Toggle me on"
        checked={switchTicked}
        onChange={() => setSwitchTicked(!switchTicked)}
      />

      <div className="my-4">
        <Switch
          label="Disabled"
          disabled
          info="I should not be clickable"
          checked={switchTicked}
          onChange={() => setSwitchTicked(!switchTicked)}
        />
      </div>

      <Checkbox
        label="Tick me"
        checked={checkboxTicked}
        onClick={() => setCheckboxTicked(!checkboxTicked)}
        labelRight
      />

      <Checkbox
        label="I'm disabled"
        disabled
        info="I should not be clickable"
        checked={checkboxTicked}
        onClick={() => setCheckboxTicked(!checkboxTicked)}
        labelRight
      />

      <DatePicker
        label="Month"
        placeholder="Month"
        dateFormat={"yyyy-MM"}
        selected={new Date()}
        onChange={date => {
          console.log(date);
        }}
      />
      {/* <Modal.Medium title="A modal!" closeButton show={true}>
        Some content here
    </Modal.Medium> */}

      <Textarea label="Description" info="Testing all the styles here" optional />
      <SkeletonLoader.ShipmentLoader />
    </div>
  );
}

export default CornelScratchPad;
