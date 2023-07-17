import { useEffect } from "react";
import { DatePicker } from "./datePicker/DatePicker";
import { MonthPicker } from "./monthPicker/MonthPicker";
import { Select } from "./Select";
import moment from "moment";

function DateRange(props: {
  showRange?: boolean;
  showMonth?: boolean;
  period?: string;
  defaultPeriod?: string;
  dateFrom?: any; // used for range and/or month selection
  defaultDateFrom?: any; // used for range and/or month selection
  dateTo?: any; // used for range and/or month selection
  defaultDateTo?: any; // used for range and/or month selection
  onPeriodChange?: Function;
  onRangeChange?: Function;
  onMonthChange?: Function;
  periodOptions?: { label: string; value: string }[];
  containerClassName?: string;
  label?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
}) {
  let {
    showRange,
    showMonth,
    period,
    defaultPeriod,
    dateFrom,
    defaultDateFrom,
    dateTo,
    defaultDateTo,
    onPeriodChange,
    onRangeChange,
    onMonthChange,
    periodOptions,
    containerClassName,
    label,
    disabled,
    showTimeSelect,
    dateFormat
  } = props;
  useEffect(() => {
    if (showMonth && onMonthChange) {
      // ensure default values are from start to end of month
      let defaultToMonth = Date.parse(
        moment(defaultDateTo).endOf("month").format("YYYY-MM-DD HH:mm:ss")
      );
      let defaultFromMonth = Date.parse(
        moment(defaultDateTo).startOf("month").format("YYYY-MM-DD HH:mm:ss")
      );

      if (dateFrom) {
        dateFrom = moment(dateFrom).startOf("month").format("YYYY-MM-DD HH:mm:ss"); // removed .format("YYYY-MM-DD HH:mm:ss) to make things work on safari
        dateTo = moment(dateFrom).endOf("month").format("YYYY-MM-DD HH:mm:ss"); // added .format back because safari seems to be working again
      }

      onMonthChange(dateFrom ?? defaultFromMonth, dateTo ?? defaultToMonth);
    } else if (showRange && onRangeChange) {
      onRangeChange(dateFrom ?? defaultDateFrom, dateTo ?? defaultDateTo);
    } else if (onPeriodChange) {
      onPeriodChange(period ?? defaultPeriod);
    }
  }, [showRange, showMonth]);

  return (
    <div className={containerClassName ?? "flex flex-row space-x-4"}>
      <Select
        options={periodOptions ?? []}
        onChange={(val: string) => {
          if (onPeriodChange) {
            onPeriodChange(val);
          }
        }}
        placeholder={"Select period"}
        value={period ?? defaultPeriod}
        label={label}
        disabled={disabled}
      />
      {showRange && (
        <>
          <DatePicker
            showTimeSelect={showTimeSelect}
            label="From"
            selected={dateFrom ?? defaultDateFrom}
            onChange={(val: any) => {
              if (onRangeChange) {
                onRangeChange(val, dateTo);
              }
            }}
            dateFormat={dateFormat ?? "yyyy-MM-DD"}
          />
          <DatePicker
            showTimeSelect={showTimeSelect}
            label="To"
            selected={dateTo ?? defaultDateTo}
            onChange={(val: any) => {
              if (onRangeChange) {
                onRangeChange(dateFrom, val);
              }
            }}
            dateFormat={dateFormat ?? "yyyy-MM-DD"}
          />
        </>
      )}
      {showMonth && (
        <div>
          <MonthPicker
            label="Select month"
            dateFrom={dateFrom ?? defaultDateFrom}
            onChange={(dateFrom: any) => {
              if (onMonthChange) {
                // @ts-ignore
                let dateTo = new Date(moment(dateFrom).endOf("month"));
                onMonthChange(dateFrom, dateTo);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

DateRange.defaultProps = {
  label: "Filter by period"
};

export { DateRange };
