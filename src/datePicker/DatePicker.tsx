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
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  onChange: (date: Date) => void;
  onDatePickerClose?: Function;
  disabled?: boolean;
  dataTest?: string | undefined;
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
    onDatePickerClose,
    showTimeSelect,
    disabled,
    minDate,
    maxDate,
    dataTest
  } = props;

  let date = new Date();
  if (selected) {
    date = moment(selected).toDate();
  }

  const popupNode = useRef<HTMLElement>();
  const ctxValue = useDatePickerCtx(
    date,
    onChange,
    onDatePickerClose,
    Boolean(showTimeSelect),
    popupNode,
    minDate,
    maxDate
  );

  return (
    <DatePickerCtx.Provider value={ctxValue} key={ctxValue.isVisible.toString()}>
      {/* @ts-ignore */}
      <Manager>
        {/* @ts-ignore */}
        <Reference>
          {({ ref }) => (
            <div>
              <Input
                reference={ref}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    ctxValue.toggleCalendar();
                  }
                }}
                onClick={() => {
                  ctxValue.toggleCalendar();
                }}
                value={selected ? formattedDate(dateFormat, date) : ""}
                readOnly
                label={label}
                labelInline={labelInline}
                containerClassName={containerClassName}
                placeholder={placeholder}
                appendIcon={disabled ? undefined : ctxValue.isVisible ? "caret-up" : "caret-down"}
                onAppendIconClick={() => {
                  ctxValue.toggleCalendar();
                }}
                appendIconColor="text-gray-400"
                disabled={disabled}
                dataTest={dataTest}
              />
            </div>
          )}
        </Reference>

        {!disabled && (
          // @ts-ignore
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
        )}
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
        className="bg-white z-40 relative shadow-lg max-w-xs w-64 p-2 rounded-lg u-black-ring"
        ref={ref}
        data-placement={props.placement}
        // @ts-ignore
        style={props.style}
      >
        {selectionComponent}
      </div>
    );
  }
);

const TimeSelection: React.FC<{}> = _ => {
  const { selectHours, selectMinutes, date } = useContext(DatePickerCtx);
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
            defaultValue={moment(date).format("HH")}
            placeholder="hh"
            onChange={(e: any) => {
              let hours = e.target.value;
              try {
                hours = parseInt(hours);
                if (isNaN(hours)) {
                  selectHours(0);
                  return;
                }
                if (hours < 0) {
                  hours = 0;
                } else if (hours > 23) {
                  hours = 23;
                }
                selectHours(hours);
              } catch (e) {
                selectHours(0);
              }
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
            defaultValue={moment(date).format("mm")}
            placeholder="mm"
            onChange={(e: any) => {
              let minutes = e.target.value;
              try {
                minutes = parseInt(minutes);
                if (isNaN(minutes)) {
                  selectMinutes(0);
                  return;
                }
                if (minutes < 0) {
                  minutes = 0;
                } else if (minutes > 59) {
                  minutes = 59;
                }
                selectMinutes(minutes);
              } catch (e) {
                selectMinutes(0);
              }
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
    showTimeSelect,
    isWithinRange
  } = useContext(DatePickerCtx);

  const dates = [];

  for (let i = 0; i < beginningDayOfWeek(month, year); i++) {
    dates.push(<div key={`emptybefore${i}`}></div>);
  }

  for (let i = 1; i <= daysInMonth(month, year); i++) {
    let inRange: boolean = isWithinRange(i);
    dates.push(
      <button
        tabIndex={0}
        key={`day${i}`}
        className={`u-focus hover:bg-gray-200 rounded p-1 ${
          isSelectedDate(i) ? "bg-gray-300 font-semibold " : ""
        }
        
        ${inRange ? "" : " text-gray-400 cursor-not-allowed"}`}
        onClick={(e: any) => {
          e.preventDefault();
          if (!inRange) {
            return;
          }
          selectDate(i);
        }}
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
          tabIndex={0}
          className="u-focus hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center"
          onClick={(e: any) => {
            e.preventDefault();
            prevMonth();
          }}
        >
          <FontAwesomeIcon icon="chevron-left" className="stroke-current" />
        </button>

        <button
          tabIndex={0}
          className={`u-focus hover:bg-gray-200 rounded p-1 u-horizontal-center align-center  focus:outline-none items-center font-semibold`}
          style={{ gridColumn: "2/5" }}
          onClick={() => viewMonths()}
        >
          {monthNames[month]}
        </button>

        <button
          tabIndex={0}
          className={`u-focus hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center font-semibold`}
          style={{ gridColumn: "5/7" }}
          onClick={() => viewYears()}
        >
          {year}
        </button>

        <button
          tabIndex={0}
          className="u-focus hover:bg-gray-200 rounded p-1 u-horizontal-center align-center focus:outline-none items-center"
          onClick={(e: any) => {
            e.preventDefault();
            nextMonth();
          }}
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
        <CalendarButton
          chevron="left"
          onClick={(e: any) => {
            e.preventDefault();
            prevYear();
          }}
        />
        <CalendarButton className="flex-grow" onClick={() => viewYears()}>
          {visible.year}
        </CalendarButton>
        <CalendarButton
          chevron="right"
          onClick={(e: any) => {
            e.preventDefault();
            nextYear();
          }}
        />
      </div>

      {monthNames.map((month, index) => (
        <CalendarButton key={`month${index}`} onClick={() => selectMonth(index)}>
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
    years.push(
      <CalendarButton
        key={`year${i}`}
        onClick={(e: any) => {
          e.preventDefault();
          selectYear(i);
        }}
      >
        {i}
      </CalendarButton>
    );
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
        <CalendarButton
          chevron="left"
          onClick={(e: any) => {
            e.preventDefault();
            prevDecade();
          }}
        />
        <CalendarButton
          onClick={(e: any) => {
            e.preventDefault();
          }}
          className="flex-grow"
        >{`${minYear} - ${maxYear - 1}`}</CalendarButton>
        <CalendarButton
          chevron="right"
          onClick={(e: any) => {
            e.preventDefault();
            nextDecade();
          }}
        />
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
  children?: any;
}> = props => {
  let children = null;

  if (props.chevron && props.chevron === "left")
    children = <FontAwesomeIcon icon="chevron-left" className="stroke-current" />;
  else if (props.chevron && props.chevron === "right")
    children = <FontAwesomeIcon icon="chevron-right" className="stroke-current" />;
  else children = props.children;

  return (
    <button
      tabIndex={0}
      className={`hover:bg-gray-200 rounded p-1 u-horizontal-center align-center u-focus items-center ${props.className}`}
      // @ts-ignore
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