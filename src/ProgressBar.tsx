import React from "react";

function ProgressBar(props: { percentage: number }) {
  let { percentage } = props;
  function render() {
    return (
      <div className="relative overflow-hidden rounded-full h-6 w-full bg-gray-300">
        <div
          className="absolute h-full bg-primary "
          style={{ width: `${percentage}%`, transition: "width 0.3s" }}
        ></div>
        <div className="absolute text-center w-full "> {percentage} %</div>
      </div>
    );
  }

  return render();
}

export { ProgressBar };
