/// <reference types="react" />
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
export declare const DatePickerCtx: import("react").Context<DatePickerContextType>;
export declare function useDatePickerCtx(date: Date, onChange: (d: Date) => void, onDatePickerClose: Function | undefined, showTimeSelect: boolean, ref: React.MutableRefObject<HTMLElement | undefined>, minDate?: Date, maxDate?: Date): DatePickerContextType;
export {};
