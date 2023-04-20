import { BrowserRouter as Router } from "react-router-dom";
import "../../src/index.scss";
import "index.scss";
import App from "App";
import * as ReactDOMClient from "react-dom/client";

const root = ReactDOMClient.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>
);
