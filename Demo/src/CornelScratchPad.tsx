import { Input, SkeletonLoader, Switch } from "../../src";

function CornelScratchPad() {
  return (
    <div>
      <Input
        prependText="R"
        label="Price"
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
      <Switch
        label="Toggle me on"
        info="This won't work without state mgt"
        checked={false}
        onChange={() => {}}
      />
      <SkeletonLoader.ShipmentLoader />
    </div>
  );
}

export default CornelScratchPad;
