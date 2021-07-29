// Derived from https://github.com/fareez-ahamed/react-datepicker

import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Manager, Reference, Popper } from "react-popper";
import { DatePickerCtx, useDatePickerCtx } from "./DatePickerContext";
import moment from "moment";
import { Input } from "../Input";

// Interface
interface IDatePicker {
  selected: Date;
  label?: string;
  placeholder?: string;
  dateFormat?: string;
  maxDate?: Date; // todo implement
  showTimeSelect?: boolean; // todo implement
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
  let { selected, label, placeholder, dateFormat, onChange } = props;

  let date = new Date();
  if (selected) {
    date = moment(selected).toDate();
  }

  const popupNode = useRef<HTMLElement>();
  const ctxValue = useDatePickerCtx(date, onChange, popupNode);

  return (
    <DatePickerCtx.Provider value={ctxValue}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className="flex" ref={ref}>
              <Input
                onFocus={() => ctxValue.showCalendar()}
                value={formattedDate(dateFormat, date)}
                readOnly
                label={label}
                placeholder={placeholder}
              />
            </div>
          )}
        </Reference>
        <Popper placement="bottom-start" innerRef={node => (popupNode.current = node)}>
          {({ ref, style, placement }) =>
            ctxValue.isVisible ? <Calendar placement={placement} style={style} ref={ref} /> : null
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
        className="bg-white relative shadow-lg max-w-xs w-64 p-2 rounded-lg mt-1 z-20 ring-1 ring-black ring-opacity-5"
        ref={ref}
        data-placement={props.placement}
        style={props.style}
      >
        {selectionComponent}
      </div>
    );
  }
);

const DateSelection: React.FC<{}> = _ => {
  const {
    nextMonth,
    prevMonth,
    viewMonths,
    viewYears,
    selectDate,
    visible: { month, year },
    isSelectedDate
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
    <div
      className="text-gray-800"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "2rem auto",
        alignItems: "stretch"
      }}
    >
      <button className={buttonClassName} onClick={() => prevMonth()}>
        <FontAwesomeIcon icon="chevron-left" className="stroke-current" />
      </button>

      <button
        className={`${buttonClassName} font-semibold`}
        style={{ gridColumn: "2/5" }}
        onClick={() => viewMonths()}
      >
        {monthNames[month]}
      </button>

      <button
        className={`${buttonClassName} font-semibold`}
        style={{ gridColumn: "5/7" }}
        onClick={() => viewYears()}
      >
        {year}
      </button>

      <button className={buttonClassName} onClick={() => nextMonth()}>
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
        <CalendarButton onClick={() => selectMonth(index)}>{month.substring(0, 3)}</CalendarButton>
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

const buttonClassName =
  "hover:bg-gray-200 rounded p-1 flex align-center justify-center focus:outline-none";

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
      className={`${buttonClassName} ${props.className}`}
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
