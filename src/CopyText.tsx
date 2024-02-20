// @ts-ignore
import React from "react";

function CopyText(props: { text: string }) {
  return (
    <span
      title="Copy to clipboard"
      className="pointer"
      onClick={() => {
        navigator.clipboard.writeText(props.text);
      }}
    >
      {props.text}
    </span>
  );
}

export default CopyText;
