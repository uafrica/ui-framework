import { createContext, useEffect, useState } from "react";
import moment from "moment";

type ViewState = "date" | "month" | "year";

interface MonthYear {
  month: number;
  year: number;
}
interface Time {
  hours: number;
  minutes: number;
}

interface DatePickerContextType {
  date: Date | null;
  minDate?: Date;
  maxDate?: Date;
  visible: MonthYear;
  time: Time;
  view: ViewState;
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
  nextDecade: () => void;
  prevDecade: () => void;
  selectMinutes: (m: number) => void;
  selectHours: (h: number) => void;
  selectMonth: (m: number) => void;
  selectYear: (y: number) => void;
  selectDate: (d: number) => void;
  viewMonths: () => void;
  viewYears: () => void;
  isVisible: boolean;
  showTimeSelect: boolean;
  showCalendar: () => void;
  toggleCalendar: () => void;
  isSelectedDate: (d: number) => boolean;
  isWithinRange: (d: number) => boolean;
}

export const DatePickerCtx = createContext<DatePickerContextType>({
  date: new Date(),
  minDate: undefined,
  maxDate: undefined,
  visible: {
    month: 0,
    year: 1970
  },
  time: { hours: 0, minutes: 0 },
  view: "date",
  nextMonth: () => {},
  prevMonth: () => {},
  nextYear: () => {},
  prevYear: () => {},
  nextDecade: () => {},
  prevDecade: () => {},
  selectMinutes: () => {},
  selectHours: () => {},
  selectMonth: () => {},
  selectYear: () => {},
  selectDate: () => {},
  viewMonths: () => {},
  viewYears: () => {},
  isVisible: false,
  showCalendar: () => {},
  toggleCalendar: () => {},
  isSelectedDate: () => false,
  isWithinRange: () => true,
  showTimeSelect: false
});

export function useDatePickerCtx(
  date: Date,
  onChange: (d: Date) => void,
  onDatePickerClose: Function | undefined,
  showTimeSelect: boolean,
  ref: React.MutableRefObject<HTMLElement | undefined>,
  minDate?: Date,
  maxDate?: Date
): DatePickerContextType {
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: date?.getMonth() ?? new Date().getMonth(),
    year: date?.getFullYear() ?? new Date().getFullYear()
  });
  const [time, setTime] = useState<Time>({
    hours: date?.getHours() ?? new Date().getHours(),
    minutes: date?.getMinutes() ?? new Date().getMinutes()
  });

  const [view, setView] = useState<ViewState>("date");

  const [isVisible, setVisible] = useState<boolean>(false);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else if (isVisible === false) {
      if (onDatePickerClose) {
        onDatePickerClose();
      }
    }
  }, [isVisible]);

  const selectDate = (d: number) => {
    if (showTimeSelect) {
      onChange(new Date(monthYear.year, monthYear.month, d, time.hours, time.minutes));
    } else {
      onChange(new Date(monthYear.year, monthYear.month, d));
    }
    if (!showTimeSelect) {
      setVisible(false);
    }
  };

  const isWithinRange = (d: number) => {
    let inRange = true;
    let date: Date;
    if (showTimeSelect) {
      date = new Date(monthYear.year, monthYear.month, d, time.hours, time.minutes);
    } else {
      date = new Date(monthYear.year, monthYear.month, d);
    }

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

  const isSelectedDate = (d: number): boolean => {
    if (
      d === date.getDate() &&
      monthYear.month === date.getMonth() &&
      monthYear.year === date.getFullYear()
    ) {
      return true;
    }
    return false;
  };

  const selectMinutes = (m: number) => {
    setTime(state => ({ ...state, minutes: m }));
    let newDate = date;
    newDate.setHours(time.hours);
    newDate.setMinutes(m);
    onChange(new Date(newDate));
  };
  const selectHours = (h: number) => {
    setTime(state => ({ ...state, hours: h }));
    let newDate = date;
    newDate.setHours(h);
    newDate.setMinutes(time.minutes);
    onChange(new Date(newDate));
  };

  const selectMonth = (m: number) => {
    setMonthYear(state => ({ ...state, month: m }));
    setView("date");
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
    time: time,
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
    selectMinutes,
    selectHours,
    selectMonth,
    selectYear,
    selectDate,
    viewMonths: () => setView("month"),
    viewYears: () => setView("year"),
    isVisible,
    showCalendar: () => setVisible(true),
    toggleCalendar: () => setVisible(state => !state),
    isSelectedDate,
    isWithinRange,
    showTimeSelect
  };
}
