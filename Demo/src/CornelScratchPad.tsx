import { useState } from "react";
import { Checkbox, DatePicker, Input, SkeletonLoader, Switch, Textarea } from "../../src";

function CornelScratchPad() {
  let [checkboxTicked, setCheckboxTicked] = useState(false);
  let [switchTicked, setSwitchTicked] = useState(false);

  return (
    <div>
      <div className="max-w-md my-4">
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
      <Switch
        label="Toggle me on"
        info="This won't work without state mgt"
        checked={switchTicked}
        onChange={() => setSwitchTicked(!switchTicked)}
      />

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
