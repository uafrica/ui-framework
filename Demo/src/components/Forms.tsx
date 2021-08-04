import { InfoButton, Input, Switch } from "../../../src";
import { useState } from "react";

function Forms() {
  const [inlineInput, setInlineInput] = useState<boolean>(false);
  const [selection, setSelection] = useState<any>(null);

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

  return (
    <div className="mt-5">
      <InputPrice />
      <SelectInput />
    </div>
  );
}

export default Forms;
