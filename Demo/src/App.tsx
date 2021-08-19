import { Modal } from "../../src";
import TabsPage from "./components/Tabs";
// import { Button, Input, PageActionsPanel, Select } from "../../src/index";

function App() {
  return (
    <div className="p-8">
      <TabsPage />
      <Modal.Host />
    </div>
  );
}

export default App;
