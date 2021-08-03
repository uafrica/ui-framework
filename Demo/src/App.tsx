import CornelScratchPad from "CornelScratchPad";
import { Button, Input, PageActionsPanel, Select } from "../../src/index";

function App() {
  return (
    <div className="p-8">
      <PageActionsPanel title="Demo page">
        <Button.Primary title="A button related to the page" />
      </PageActionsPanel>

      <Select
        placeholder="Select an option"
        options={[
          { label: "Option 1", value: 1 },
          { label: "Option 2", value: 2 }
        ]}
      />

      <Input label="Name" />

      <CornelScratchPad />
    </div>
  );
}

export default App;
