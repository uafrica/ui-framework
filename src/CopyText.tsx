// @ts-ignore
import React from "react";

function CopyText(props: { text: string }) {
  const { text } = props;
  return (
    <span
      title="Copy to clipboard"
      className="pointer"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      {text}
    </span>
  );
}

export default CopyText;
