import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "ui-framework-v2/tailwind.css";
import "ui-framework-v2/ui-framework-v2.cjs.development.css";
import "index.scss";
import App from "App";

// Create a root.
// const root = ReactDOMClient.createRoot(container);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Initial render: Render an element to the root.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
