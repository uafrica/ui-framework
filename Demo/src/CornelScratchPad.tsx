import { Input, SkeletonLoader, Switch, Textarea } from "../../src";

function CornelScratchPad() {
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
        checked={false}
        onChange={() => {}}
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