import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "../../src/index.scss";
import "index.scss";

import { Button } from "../../src/index";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Button.Primary title="Test" />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
