import moment, { Moment } from "moment";

function shortenFromNow(str: string): string {
  if (str === "a few seconds ago") str = "now";

  str = str.replaceAll("hours", "h").replaceAll("minutes", "m").replaceAll("seconds", "s");
  str = str.replaceAll("hour", "h").replaceAll("minute", "m").replaceAll("second", "s");
  str = str.replaceAll("days", "d").replaceAll("day", "d");
  str = str.replaceAll("months", "mo").replaceAll("month", "mo");
  str = str.replaceAll(" ago", "").replaceAll("an ", " 1 ").replaceAll("a ", " 1 ");

  str = str.replaceAll(" ", "");

  if (str === "in1fews") {
    // happens when server is a few seconds ahead of machine
    return "now";
  }
  return str;
}

function pgFormatDate(date: string | Date | Moment | undefined): string {
  if (!date) return "";
  let momentDate: Moment = moment(date);
  return momentDate.format("YYYY-MM-DD HH:mm:ssZ");
}

function humanFormatTime(date: string | Date | Moment | undefined, includeSeconds?: boolean): any {
  if (!date) return "";
  let momentDate: Moment = moment(date);
  if (momentDate.isValid()) {
    return momentDate.format("HH:mm" + (includeSeconds ? ":ss" : ""));
  } else {
    return date;
  }
}

function humanFormatDateTime(
  date: string | Date | Moment | undefined,
  includeSeconds?: boolean
): string {
  if (!date) return "";
  let momentDate: Moment = moment(date);
  return momentDate.format("D MMM YYYY HH:mm" + (includeSeconds ? ":ss" : ""));
}

function humanFormatDateTimeToFormat(
  date: string | Date | Moment | undefined,
  format: string
): string {
  if (!date) return "";
  let momentDate: Moment = moment(date);
  return momentDate.format(format);
}

function humanFormatDate(date: string | Date | Moment | undefined): string {
  if (!date) return "";
  let momentDate: Moment = moment(date);
  return momentDate.format("D MMM YYYY");
}

function humanFormatDateWithDay(date: string | Date | Moment | undefined): string {
  if (!date) return "";
  let momentDate: Moment = moment(date);
  return momentDate.format("ddd, D MMM YYYY");
}

function humanFormatBetweenDates(dateFrom: string, dateTo: string) {
  if (dateFrom?.indexOf("T") > -1) {
    dateFrom = humanFormatDateTime(dateFrom);
  }
  if (dateTo?.indexOf("T") > -1) {
    dateTo = humanFormatDateTime(dateTo);
  }
  return { from: dateFrom, to: dateTo };
}

// returns amount of minutes between two dates where startDate is chronologically first and endDate is chronologically last
function getMinutesBetweenDates(
  startDate: string | Date | Moment,
  endDate: string | Date | Moment
): number {
  if (!startDate || !endDate) return 0;
  let momentStartDate: Moment = moment(startDate);
  let momentEndDate: Moment = moment(endDate);
  let duration = moment.duration(momentEndDate.diff(momentStartDate));
  return duration.asMinutes();
}

function formatDateTodayTomorrow(dateString: string): string {
  let date = moment(dateString);
  if (date.isSame(moment(), "day")) {
    return "Today, " + humanFormatDate(date);
  }

  if (date.isSame(moment().add(1, "days"), "day")) {
    return "Tomorrow, " + humanFormatDate(date);
  }

  return humanFormatDateWithDay(date);
}

function timeslotAsInt(time: string): number {
  if (!time) return 0;

  return parseInt(time.replace(":", ""));
}

// Check for getTimeslots() if it will work on SL and BG

function orderDays(days: any[]) {
  // order the days
  const sorter: any = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7
  };

  days.sort(function sortByDay(a, b) {
    let day1 = a.name.toLowerCase();
    let day2 = b.name.toLowerCase();
    return sorter[day1] - sorter[day2];
  });
}

export {
  shortenFromNow,
  pgFormatDate,
  humanFormatTime,
  humanFormatDateTime,
  humanFormatDateTimeToFormat,
  humanFormatDate,
  humanFormatDateWithDay,
  humanFormatBetweenDates,
  getMinutesBetweenDates,
  formatDateTodayTomorrow,
  timeslotAsInt,
  orderDays
};
