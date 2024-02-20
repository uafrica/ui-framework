import moment from "moment";
// @ts-ignore
import React, { useEffect } from "react";
import { DatePicker } from "./datePicker/DatePicker";
import { MonthPicker } from "./monthPicker/MonthPicker";
import { Select } from "./Select";

function DateRange(props: {
  isLabelInline?: boolean;
  showRange?: boolean;
  showMonth?: boolean;
  period?: string;
  defaultPeriod?: string;
  dateFrom?: any; // Used for range and/or month selection
  defaultDateFrom?: any; // Used for range and/or month selection
  dateTo?: any; // Used for range and/or month selection
  defaultDateTo?: any; // Used for range and/or month selection
  onPeriodChange?: Function;
  onRangeChange?: Function;
  onMonthChange?: Function;
  periodOptions?: { label: string; value: string }[];
  containerClassName?: string;
  label?: string;
  isDisabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  buttonWidth?: string;
}) {
  let {
    isLabelInline,
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
    isDisabled,
    showTimeSelect,
    dateFormat,
    buttonWidth,
  } = props;
  useEffect(() => {
    if (showMonth && onMonthChange) {
      // Ensure default values are from start to end of month
      let defaultToMonth = Date.parse(
        moment(defaultDateTo).endOf("month").format("YYYY-MM-DD HH:mm:ss")
      );
      let defaultFromMonth = Date.parse(
        moment(defaultDateTo).startOf("month").format("YYYY-MM-DD HH:mm:ss")
      );

      if (dateFrom) {
        dateFrom = moment(dateFrom)
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"); // Removed .format("YYYY-MM-DD HH:mm:ss) to make things work on safari
        dateTo = moment(dateFrom).endOf("month").format("YYYY-MM-DD HH:mm:ss"); // Added .format back because safari seems to be working again
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
        isLabelInline={isLabelInline}
        buttonWidth={buttonWidth}
        options={periodOptions ?? []}
        onChange={(val: string) => {
          if (onPeriodChange) {
            onPeriodChange(val);
          }
        }}
        placeholder={"Select period"}
        value={period ?? defaultPeriod}
        label={label}
        isDisabled={isDisabled}
      />
      {showRange && (
        <>
          <DatePicker
            isLabelInline={isLabelInline}
            showTimeSelect={showTimeSelect}
            label="From"
            selectedDate={dateFrom ?? defaultDateFrom}
            onChange={(val: any) => {
              if (onRangeChange) {
                onRangeChange(val, dateTo);
              }
            }}
            dateFormat={dateFormat ?? "yyyy-MM-DD"}
          />
          <DatePicker
            isLabelInline={isLabelInline}
            showTimeSelect={showTimeSelect}
            label="To"
            selectedDate={dateTo ?? defaultDateTo}
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
            isLabelInline={isLabelInline}
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
  label: "Filter by period",
};

export { DateRange };
