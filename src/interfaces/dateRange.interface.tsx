import { ReactNode } from "react";

export interface IDateRange {
  isLabelInline?: boolean;
  showRange?: boolean;
  showMonth?: boolean;
  period?: string;
  defaultPeriod?: string;
  dateFrom?: any; // Used for range and/or month selection
  defaultDateFrom?: any; // Used for range and/or month selection
  dateTo?: any; // Used for range and/or month selection
  defaultDateTo?: any; // Used for range and/or month selection
  onPeriodChange?: (period: string | undefined) => void;
  onRangeChange?: (dateFrom: any, dateTo: any) => void;
  onMonthChange?: (dateFrom: any, dateTo: any) => void;
  periodOptions?: { label: string; value: string }[];
  containerClassName?: string;
  label?: ReactNode;
  isDisabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  buttonWidth?: string;
}
