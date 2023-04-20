import { Moment } from "moment";
declare function shortenFromNow(str: string): string;
declare function pgFormatDate(date: string | Date | Moment | undefined): string;
declare function humanFormatTime(date: string | Date | Moment | undefined, includeSeconds?: boolean): any;
declare function humanFormatDateTime(date: string | Date | Moment | undefined, includeSeconds?: boolean): string;
declare function humanFormatDateTimeToFormat(date: string | Date | Moment | undefined, format: string): string;
declare function humanFormatDate(date: string | Date | Moment | undefined): string;
declare function humanFormatDateWithDay(date: string | Date | Moment | undefined): string;
declare function humanFormatBetweenDates(dateFrom: string, dateTo: string): {
    from: string;
    to: string;
};
declare function getMinutesBetweenDates(startDate: string | Date | Moment, endDate: string | Date | Moment): number;
declare function formatDateTodayTomorrow(dateString: string): string;
declare function timeslotAsInt(time: string): number;
declare function getTimeslots(startTime?: string, endTime?: string, removeFirst?: boolean, removeLast?: boolean): {
    id: number;
    display: string;
}[];
declare function orderDays(days: any[]): void;
export { shortenFromNow, pgFormatDate, humanFormatTime, humanFormatDateTime, humanFormatDateTimeToFormat, humanFormatDate, humanFormatDateWithDay, humanFormatBetweenDates, getMinutesBetweenDates, formatDateTodayTomorrow, timeslotAsInt, orderDays, getTimeslots };
