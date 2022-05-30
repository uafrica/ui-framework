import { useEffect } from "react";
import { DatePicker } from "./datePicker/DatePicker";
import { Select } from "./Select";

function DateRange(props: {
  showRange?: boolean;
  period?: string;
  defaultPeriod?: string;
  dateFrom?: any;
  defaultDateFrom?: any;
  dateTo?: any;
  defaultDateTo?: any;
  onPeriodChange?: Function;
  onRangeChange?: Function;
  periodOptions?: { label: string; value: string }[];
  containerClassName?: string;
}) {
  let {
    showRange,
    period,
    defaultPeriod,
    dateFrom,
    defaultDateFrom,
    dateTo,
    defaultDateTo,
    onPeriodChange,
    onRangeChange,
    periodOptions,
    containerClassName
  } = props;

  useEffect(() => {
    if (showRange && onRangeChange) {
      onRangeChange(defaultDateFrom, defaultDateTo);
    } else if (onPeriodChange) {
      onPeriodChange(defaultPeriod);
    }
  }, [showRange]);
  return (
    <div className={containerClassName ?? "flex flex-row space-x-4"}>
      {showRange ? (
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
      ) : (
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
      )}
    </div>
  );
}

export { DateRange };
