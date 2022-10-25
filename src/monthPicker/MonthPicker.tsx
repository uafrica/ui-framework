
import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Manager, Reference, Popper } from "react-popper";
import { MonthPickerCtx, useMonthPickerCtx } from "./MonthPickerContext";
import moment from "moment";
import { Input } from "../Input";

interface IMonthPicker {
  dateFrom: Date;
  label?: string;
  labelInline?: boolean;
  placeholder?: string;
  containerClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
  onMonthPickerClose?: Function;
  disabled?: boolean;
  dataTest?: string | undefined;
}

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

function MonthPicker(props: IMonthPicker) {
  let {
    dateFrom,
    label,
    labelInline,
    placeholder,
    containerClassName,
    onChange,
    onMonthPickerClose,
    disabled,
    minDate,
    maxDate,
    dataTest
  } = props;

  let date = new Date();
  if (dateFrom) {
    date = moment(dateFrom).toDate();
  }

  const popupNode = useRef<HTMLElement>();
  const ctxValue = useMonthPickerCtx(
    date,
    onChange,
    onMonthPickerClose,
    popupNode,
    minDate,
    maxDate
  );

  return (
    <MonthPickerCtx.Provider value={ctxValue} key={ctxValue.isVisible.toString()}>
      {/* @ts-ignore */}
      <Manager>
        {/* @ts-ignore */}
        <Reference>
          {({ ref }) => (
            <div>
              <Input
                reference={ref}
                pointer
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    ctxValue.toggleCalendar();
                  }
                }}
                onClick={() => {
                  ctxValue.toggleCalendar();
                }}
                value={dateFrom ? moment(date).format("MMMM YYYY") : ""}
                readOnly
                label={label}
                dataTest={dataTest}
                labelInline={labelInline}
                containerClassName={containerClassName}
                placeholder={placeholder}
                appendIcon={disabled ? undefined : ctxValue.isVisible ? "caret-up" : "caret-down"}
                onAppendIconClick={() => {
                  ctxValue.toggleCalendar();
                }}
                appendIconColor="text-gray-400"
                disabled={disabled}
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
    </MonthPickerCtx.Provider>
  );
}

interface CalendarProps {
  style: React.CSSProperties;
  placement: string;
  ref: React.Ref<HTMLDivElement>;
}

const Calendar: React.FC<CalendarProps> = React.forwardRef<HTMLDivElement, CalendarProps>(
  (props, ref) => {
    const { view } = useContext(MonthPickerCtx);

    let selectionComponent = null;
    switch (view) {
      case "month":
        selectionComponent = <MonthSelection />;
        break;
      case "year":
        selectionComponent = <YearSelection />;
        break;
    }

    return (
      <div
        className="u-focus bg-white z-40 relative shadow-lg max-w-xs w-64 p-2 rounded-lg u-black-ring"
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

const MonthSelection: React.FC<{}> = _ => {
  const { viewYears, selectMonth, nextYear, prevYear, visible, isSelectedMonth, isWithinRange } =
    useContext(MonthPickerCtx);

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

      {monthNames.map((month, index) => {
        let inRange: boolean = isWithinRange(index);

        return (
          <CalendarButton
            key={month}
            onClick={() => {
              if (inRange) {
                selectMonth(index);
              }
            }}
            className={`u-focus hover:bg-gray-200 rounded p-1 ${
              isSelectedMonth(index) ? "bg-gray-300 font-semibold " : ""
            }
            ${inRange ? "" : " text-gray-400 cursor-not-allowed"}`}
          >
            {month.substring(0, 3)}
          </CalendarButton>
        );
      })}
    </div>
  );
};

const YearSelection: React.FC<{}> = _ => {
  const {
    selectYear,
    prevDecade,
    nextDecade,
    visible: { year }
  } = useContext(MonthPickerCtx);

  let years = [];
  let [minYear, maxYear] = [year - 6, year + 6];

  for (let i = minYear; i < maxYear; i++) {
    years.push(
      <CalendarButton key={i} onClick={() => selectYear(i)}>
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

export { MonthPicker };
