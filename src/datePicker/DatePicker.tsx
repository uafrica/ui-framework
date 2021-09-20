// Derived from https://github.com/fareez-ahamed/react-datepicker

import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Manager, Reference, Popper } from "react-popper";
import { DatePickerCtx, useDatePickerCtx } from "./DatePickerContext";
import moment from "moment";
import { Input } from "../Input";
import { Label } from "../Label";

// Interface
interface IDatePicker {
  selected: Date;
  label?: string;
  labelInline?: boolean;
  placeholder?: string;
  dateFormat?: string;
  containerClassName?: string;
  maxDate?: Date; // todo implement
  showTimeSelect?: boolean;
  onChange: (date: Date) => void;
}

const daysOfWeekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const inputStyle = {
  paddingTop: "0.375rem",
  paddingBottom: "0.375rem"
};

// Implementation
function DatePicker(props: IDatePicker) {
  let {
    selected,
    label,
    labelInline,
    placeholder,
    dateFormat,
    containerClassName,
    onChange,
    showTimeSelect
  } = props;

  let date = new Date();
  if (selected) {
    date = moment(selected).toDate();
  }

  const popupNode = useRef<HTMLElement>();
  const ctxValue = useDatePickerCtx(date, onChange, Boolean(showTimeSelect), popupNode);

  return (
    <DatePickerCtx.Provider value={ctxValue}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <Input
              reference={ref}
              onFocus={() => ctxValue.showCalendar()}
              value={selected ? formattedDate(dateFormat, date) : ""}
              readOnly
              label={label}
              labelInline={labelInline}
              containerClassName={containerClassName}
              placeholder={placeholder}
              appendIcon="caret-down"
            />
          )}
        </Reference>
        <Popper
          placement="bottom-start"
          innerRef={node => (popupNode.current = node)}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 5]
              }
            }
          ]}
        >
          {({ ref, style, placement }) =>
            ctxValue.isVisible ? (
              <div>
                <Calendar placement={placement} style={style} ref={ref} />
              </div>
            ) : null
          }
        </Popper>
      </Manager>
    </DatePickerCtx.Provider>
  );
}

interface CalendarProps {
  style: React.CSSProperties;
  placement: string;
  ref: React.Ref<HTMLDivElement>;
}

const Calendar: React.FC<CalendarProps> = React.forwardRef<HTMLDivElement, CalendarProps>(
  (props, ref) => {
    const { view } = useContext(DatePickerCtx);

    let selectionComponent = null;
    switch (view) {
      case "date":
        selectionComponent = <DateSelection />;
        break;
      case "month":
        selectionComponent = <MonthSelection />;
        break;
      case "year":
        selectionComponent = <YearSelection />;
        break;
    }

    return (
      <div
        className="bg-white z-30 relative shadow-lg max-w-xs w-64 p-2 rounded-lg u-black-ring"
        ref={ref}
        data-placement={props.placement}
        style={props.style}
      >
        {selectionComponent}
      </div>
    );
  }
);

const TimeSelection: React.FC<{}> = _ => {
  const {
    selectHours,
    selectMinutes,
    time: { hours, minutes }
  } = useContext(DatePickerCtx);
  return (
    <div className="mt-1 text-center">
      <div>
        <b>Time</b>
      </div>
      <div className="u-horizontal-center flex-row time-picker">
        <div style={{ width: "55px" }}>
          <Input
            label=""
            labelInline={true}
            type="number"
            step={1}
            min={0}
            max={23}
            value={hours}
            placeholder="hh"
            onChange={(e: any) => {
              let hours = e.target.value;
              if (hours < 0) {
                hours = 0;
              } else if (hours > 23) {
                hours = 23;
              }
              selectHours(hours);
            }}
          />
        </div>
        <div className="mt-2 pl-2">
          <Label>:</Label>
        </div>
        <div style={{ width: "55px" }}>
          <Input
            label=""
            labelInline={true}
            type="number"
            step={1}
            min={0}
            max={59}
            value={minutes}
            placeholder="mm"
            onChange={(e: any) => {
              let minutes = e.target.value;
              if (minutes < 0) {
                minutes = 0;
              } else if (minutes > 59) {
                minutes = 59;
              }
              selectMinutes(minutes);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const DateSelection: React.FC<{}> = _ => {
  const {
    nextMonth,
    prevMonth,
    viewMonths,
    viewYears,
    selectDate,
    visible: { month, year },
    isSelectedDate,
    showTimeSelect
  } = useContext(DatePickerCtx);

  const dates = [];

  for (let i = 0; i < beginningDayOfWeek(month, year); i++) {
    dates.push(<div key={`emptybefore${i}`}></div>);
  }

  for (let i = 1; i <= daysInMonth(month, year); i++) {
    dates.push(
      <button
        key={`day${i}`}
        className={`hover:bg-gray-200 rounded p-1 ${
          isSelectedDate(i) ? "bg-gray-300 font-semibold" : ""
        }`}
        onClick={() => selectDate(i)}
        style={{ textAlign: "center" }}
      >
        {i}
      </button>
    );
  }

  return (
    <div>
      <div
        className="text-gray-800"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "2rem auto",
          alignItems: "stretch"
        }}
      >
        <button
          className="hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center"
          onClick={() => prevMonth()}
        >
          <FontAwesomeIcon icon="chevron-left" className="stroke-current" />
        </button>

        <button
          className={`hover:bg-gray-200 rounded p-1 u-horizontal-center align-center  focus:outline-none items-center font-semibold`}
          style={{ gridColumn: "2/5" }}
          onClick={() => viewMonths()}
        >
          {monthNames[month]}
        </button>

        <button
          className={`hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center font-semibold`}
          style={{ gridColumn: "5/7" }}
          onClick={() => viewYears()}
        >
          {year}
        </button>

        <button
          className="hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center"
          onClick={() => nextMonth()}
        >
          <FontAwesomeIcon icon="chevron-right" className="stroke-current" />
        </button>

        {daysOfWeekNames.map(day => (
          <div
            key={(200 + day).toString()}
            className="p-1 font-semibold"
            style={{ textAlign: "center" }}
          >
            {day[0]}
          </div>
        ))}

        {dates}
      </div>
      {showTimeSelect && <TimeSelection />}
    </div>
  );
};

const MonthSelection: React.FC<{}> = _ => {
  const { viewYears, selectMonth, nextYear, prevYear, visible } = useContext(DatePickerCtx);

  return (
    <div
      className="h-48"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "2rem auto",
        alignItems: "stretch"
      }}
    >
      <div className="flex" style={{ gridColumn: "1/5" }}>
        <CalendarButton chevron="left" onClick={() => prevYear()} />
        <CalendarButton className="flex-grow" onClick={() => viewYears()}>
          {visible.year}
        </CalendarButton>
        <CalendarButton chevron="right" onClick={() => nextYear()} />
      </div>

      {monthNames.map((month, index) => (
        <CalendarButton key="month" onClick={() => selectMonth(index)}>
          {month.substring(0, 3)}
        </CalendarButton>
      ))}
    </div>
  );
};

const YearSelection: React.FC<{}> = _ => {
  const {
    selectYear,
    prevDecade,
    nextDecade,
    visible: { year }
  } = useContext(DatePickerCtx);

  let years = [];
  let [minYear, maxYear] = [year - 6, year + 6];

  for (let i = minYear; i < maxYear; i++) {
    years.push(<CalendarButton onClick={() => selectYear(i)}>{i}</CalendarButton>);
  }

  return (
    <div
      className="h-48"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "2rem auto",
        alignItems: "stretch"
      }}
    >
      <div className="flex" style={{ gridColumn: "1/5" }}>
        <CalendarButton chevron="left" onClick={() => prevDecade()} />
        <CalendarButton className="flex-grow">{`${minYear} - ${maxYear - 1}`}</CalendarButton>
        <CalendarButton chevron="right" onClick={() => nextDecade()} />
      </div>

      {years}
    </div>
  );
};

const CalendarButton: React.FC<{
  chevron?: "right" | "left";
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLButtonElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = props => {
  let children = null;

  if (props.chevron && props.chevron === "left")
    children = <FontAwesomeIcon icon="chevron-left" className="stroke-current" />;
  else if (props.chevron && props.chevron === "right")
    children = <FontAwesomeIcon icon="chevron-right" className="stroke-current" />;
  else children = props.children;

  return (
    <button
      className={`hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

function formattedDate(dateFormat: string | undefined, date: Date): string {
  if (!dateFormat) {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  } else {
    return moment(date).format(dateFormat);
  }
}

function beginningDayOfWeek(m: number, y: number): number {
  return new Date(y, m, 1).getDay();
}

function daysInMonth(month: number, year: number) {
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 1:
      return isLeapYear(year) ? 29 : 28;
    default:
      return 30;
  }
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export { DatePicker };
