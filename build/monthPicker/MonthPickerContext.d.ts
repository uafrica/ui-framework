/// <reference types="react" />
declare type ViewState = "month" | "year";
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
export declare const MonthPickerCtx: import("react").Context<MonthPickerContextType>;
export declare function useMonthPickerCtx(date: Date, onChange: (d: Date) => void, onMonthPickerClose: Function | undefined, ref: React.MutableRefObject<HTMLElement | undefined>, minDate?: Date, maxDate?: Date): MonthPickerContextType;
export {};
