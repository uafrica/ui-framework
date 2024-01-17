 // @ts-ignore
    import React from "react";
import { Button } from "./Button";

function NewVersionAvailable() {
  return (
    <div className={"cursor-pointer"} onClick={() => window.location.reload()}>
      <Button.LinkDanger title="New version available" />
      <p className={"text-danger text-xs ml-3 -mt-2"}>Click here to update!</p>
    </div>
  );
}

export { NewVersionAvailable };
