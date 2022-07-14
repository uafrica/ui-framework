import { createContext, useEffect, useState } from "react";
import moment from "moment";

type ViewState = "month" | "year";

interface MonthYear {
  month: number;
  year: number;
}

interface MonthPickerContextType {
  date: Date | null;
  minDate?: Date;
  maxDate?: Date;
  visible: MonthYear;
  view: ViewState;
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
  nextDecade: () => void;
  prevDecade: () => void;
  selectMonth: (m: number) => void;
  selectYear: (y: number) => void;
  viewMonths: () => void;
  viewYears: () => void;
  isVisible: boolean;
  showCalendar: () => void;
  toggleCalendar: () => void;
  isSelectedMonth: (m: number) => boolean;
  isWithinRange: (d: number) => boolean;
}

export const MonthPickerCtx = createContext<MonthPickerContextType>({
  date: new Date(),
  minDate: undefined,
  maxDate: undefined,
  visible: {
    month: 0,
    year: 1970
  },
  view: "month",
  nextMonth: () => {},
  prevMonth: () => {},
  nextYear: () => {},
  prevYear: () => {},
  nextDecade: () => {},
  prevDecade: () => {},
  selectMonth: () => {},
  selectYear: () => {},
  viewMonths: () => {},
  viewYears: () => {},
  isVisible: false,
  showCalendar: () => {},
  toggleCalendar: () => {},
  isSelectedMonth: () => false,
  isWithinRange: () => true
});

export function useMonthPickerCtx(
  date: Date,
  onChange: (d: Date) => void,
  onMonthPickerClose: Function | undefined,
  ref: React.MutableRefObject<HTMLElement | undefined>,
  minDate?: Date,
  maxDate?: Date
): MonthPickerContextType {
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: date?.getMonth() ?? new Date().getMonth(),
    year: date?.getFullYear() ?? new Date().getFullYear()
  });

  const [view, setView] = useState<ViewState>("month");

  const [isVisible, setVisible] = useState<boolean>(false);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else if (isVisible === false) {
      if (onMonthPickerClose) {
        onMonthPickerClose();
      }
    }
  }, [isVisible]);

  const isWithinRange = (d: number) => {
    let inRange = true;
    let date: Date;

    date = new Date(monthYear.year, monthYear.month, d);

    if (minDate) {
      if (moment(date).isBefore(minDate)) {
        inRange = false;
      }
    }
    if (maxDate) {
      if (moment(date).isAfter(maxDate)) {
        inRange = false;
      }
    }
    return inRange;
  };

  const isSelectedMonth = (m: number): boolean => {
    if (m === date.getMonth() && monthYear.year === date.getFullYear()) {
      return true;
    }
    return false;
  };

  const selectMonth = (m: number) => {
    setMonthYear(state => ({ ...state, month: m }));
    let dateFrom = new Date(monthYear.year, m, 1);
    onChange(dateFrom);
    setVisible(false);
  };

  const selectYear = (y: number) => {
    setMonthYear(state => ({ ...state, year: y }));
    setView("month");
  };

  useEffect(() => {
    function mouseDownListener(e: MouseEvent) {
      let targetAsNode = e.target;
      // @ts-ignore
      if (ref.current && !ref.current.contains(targetAsNode)) {
        setVisible(false);
      }
    }

    if (isVisible) {
      setMonthYear({ month: date.getMonth(), year: date.getFullYear() });
      document.addEventListener("mousedown", mouseDownListener);
    }

    return () => {
      document.removeEventListener("mousedown", mouseDownListener);
    };
  }, [isVisible]);

  return {
    date,
    visible: monthYear,
    view,
    nextMonth: () =>
      setMonthYear(state =>
        state.month >= 11
          ? { month: 0, year: state.year + 1 }
          : { month: state.month + 1, year: state.year }
      ),
    prevMonth: () =>
      setMonthYear(state =>
        state.month <= 0
          ? { month: 11, year: state.year - 1 }
          : { month: state.month - 1, year: state.year }
      ),
    nextYear: () => setMonthYear(state => ({ ...state, year: state.year + 1 })),
    prevYear: () => setMonthYear(state => ({ ...state, year: state.year - 1 })),
    nextDecade: () => setMonthYear(state => ({ ...state, year: state.year + 12 })),
    prevDecade: () => setMonthYear(state => ({ ...state, year: state.year - 12 })),
    selectMonth,
    selectYear,
    viewMonths: () => setView("month"),
    viewYears: () => setView("year"),
    isVisible,
    showCalendar: () => setVisible(true),
    toggleCalendar: () => setVisible(state => !state),
    isSelectedMonth,
    isWithinRange
  };
}
