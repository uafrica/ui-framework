// @ts-ignore
import React from "react";
import { useState } from "react";

function WeekdaySelect(props: {
  value?: number[];
  onChange?: (selectedDays: number[]) => void;
}) {
  const { value } = props;

  const [selectedDays, setSelectedDays] = useState<number[]>(value ?? []);

  const days: { letter: string; value: number }[] = [
    {
      letter: "S",
      value: 0,
    },
    {
      letter: "M",
      value: 1,
    },
    {
      letter: "T",
      value: 2,
    },
    {
      letter: "W",
      value: 3,
    },
    {
      letter: "T",
      value: 4,
    },
    {
      letter: "F",
      value: 5,
    },
    {
      letter: "S",
      value: 6,
    },
  ];

  function renderDay(day: any) {
    return (
      <div
        key={day.value}
        onClick={() => {
          let _selectedDays = [...selectedDays];
          let index = selectedDays.indexOf(day.value);
          if (index === -1) {
            _selectedDays.push(day.value);
          } else {
            _selectedDays.splice(index, 1);
          }
          setSelectedDays([..._selectedDays]);
          if (props.onChange) {
            props.onChange(_selectedDays);
          }
        }}
        className={`rounded-full h-8 w-8 flex justify-center items-center cursor-pointer font-bold ${
          selectedDays.indexOf(day.value) === -1
            ? "bg-gray-100 text-gray-500"
            : "bg-primary text-white"
        } `}
      >
        {day.letter}
      </div>
    );
  }

  function render() {
    return (
      <div className={`flex flex-row space-x-4 py-4`}>
        {days.map((day: any) => {
          return renderDay(day);
        })}
      </div>
    );
  }

  return render();
}

export { WeekdaySelect };
