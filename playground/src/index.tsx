import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "../../src/index.scss";
import "index.scss";
import App from "App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
