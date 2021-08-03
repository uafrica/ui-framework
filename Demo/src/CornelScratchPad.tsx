import { Input, SkeletonLoader } from "../../src";

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
      <SkeletonLoader.ShipmentLoader />
    </div>
  );
}

export default CornelScratchPad;
