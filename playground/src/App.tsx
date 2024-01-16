import { Modal } from "ui-framework-v2";
import TabsPage from "./components/Tabs";
import "setupIcons";

function App() {
  return (
    <div className="p-8">
      <TabsPage />
      <Modal.Host />
    </div>
  );
}

export default App;
