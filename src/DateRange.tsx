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
    containerClassName
  } = props;
  useEffect(() => {
    if (showMonth && onMonthChange) {
      onMonthChange(dateFrom ?? defaultDateFrom, dateTo ?? defaultDateTo);
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
        label={"Filter by period"}
      />
      {showRange && (
        <>
          <DatePicker
            label="From"
            selected={dateFrom ?? defaultDateFrom}
            onChange={(val: any) => {
              if (onRangeChange) {
                onRangeChange(val, dateTo);
              }
            }}
            dateFormat={"yyyy-MM-DD"}
          />
          <DatePicker
            label="To"
            selected={dateTo ?? defaultDateTo}
            onChange={(val: any) => {
              if (onRangeChange) {
                onRangeChange(dateFrom, val);
              }
            }}
            dateFormat={"yyyy-MM-DD"}
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

export { DateRange };
