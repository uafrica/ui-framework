// @ts-ignore
import React, { useState, useEffect } from "react";

function CountdownTimer(props: {
  totalSeconds: number;
  radius?: number;
  strokeWidth?: number;
  ringColorClass?: string;
}) {
  const {
    totalSeconds,
    ringColorClass = "text-primary",
    radius = 40,
    strokeWidth = 4,
  } = props;
  const dashLength = 2 * Math.PI * radius - strokeWidth * 4;
  const height = radius * 2;

  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function render() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div
        className="relative"
        style={{
          width: `${height}px`,
          height: `${height}px`,
        }}
      >
        <svg
          className="absolute "
          width="100%"
          height="100%"
          viewBox={`0 0 ${height} ${height}`}
        >
          <circle
            className="fill-transparent stroke-current text-gray-200"
            strokeWidth={strokeWidth}
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
          />
          <circle
            className={
              "fill-transparent stroke-current " +
              ringColorClass +
              " stroke-dashoffset-0"
            }
            strokeWidth={strokeWidth}
            strokeDasharray={dashLength}
            strokeDashoffset={
              dashLength * ((totalSeconds - timeLeft) / totalSeconds)
            }
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            transform={`rotate(-90 ${radius} ${radius})`}
            style={{
              transition: "stroke-dashoffset 1s ease-in-out",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold">
          {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </div>
      </div>
    );
  }

  return render();
}

export { CountdownTimer };
