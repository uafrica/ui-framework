import * as numberUtils from "./numberUtils";
import { Loader } from "./../Loader";

import { Link } from "react-router-dom";
import moment from "moment";

function getTableCountString(
  label: string,
  dataArray: any[],
  lastTableState: any,
  totalCount: number,
  page: number,
  selectedCount?: number
) {
  let displayString = "";

  if (selectedCount) {
    displayString = selectedCount + " selected";
  } else if (dataArray && dataArray.length > 0) {
    let recordsCountFrom = page * lastTableState.pageSize + 1;
    let recordsCountTo = Math.min(totalCount, recordsCountFrom + lastTableState.pageSize - 1);

    if (recordsCountTo === 0 || !recordsCountTo) {
      return <div />;
    }

    if (totalCount <= 1 && label.endsWith("s")) {
      label = label.substring(0, label.length - 1);

      if (label.endsWith("ie")) {
        label = label.substring(0, label.length - 2) + "y";
      }
    }

    let totalCountString = numberUtils.formatNumber(totalCount, true, true);
    if (totalCount >= 50000) {
      totalCountString = "50 000+";
    }

    displayString =
      `Showing ${recordsCountFrom}` +
      (recordsCountFrom !== recordsCountTo ? `–${recordsCountTo}` : "") +
      ` of ${totalCountString} ` +
      label;
  } else displayString = "";

  return displayString;
}

function getTableCountDivWithDateRangeIndication(
  label: string,
  dataArray: any[],
  lastTableState: any,
  totalCount: number,
  page: number,
  isLoading: boolean,
  selectedCount?: number,
  absolute_query?: string,
  startDate?: any,
  endDate?: any,
  absoluteQueryOptions?: any,
  isBold?: boolean
) {
  if (isBold !== undefined) {
    isBold = true;
  }
  if (!absolute_query) {
    absolute_query = "date_range";
  }

  if (startDate) {
    startDate = moment(startDate).startOf("day");
  }
  if (endDate) {
    endDate = moment(endDate).endOf("day");
  }

  let displayString = getTableCountString(
    label,
    dataArray,
    lastTableState,
    totalCount,
    page,
    selectedCount
  );

  if (!displayString) {
    displayString = "0 " + label;
  }

  let timeRangeString = "";
  if (absolute_query === "month") {
    timeRangeString = " for the selected month";
  } else if (absolute_query === "date_range") {
    // date range
    let duration = moment.duration(moment(endDate).diff(moment(startDate)));
    let days = Math.ceil(duration.asDays());
    let weeks = Math.round(duration.asWeeks());
    let timeCount = days % 7 !== 0 ? days : Math.round(weeks);
    let timeUnit = days % 7 !== 0 ? "day" : "week";
    timeRangeString =
      !endDate || !startDate
        ? ""
        : ` for the selected ${timeCount === 1 ? "" : timeCount} ${timeUnit}${
            timeCount === 1 ? "" : "s"
          }`;
  } else {
    // date period
    try {
      let _absoluteQuery: any =
        absolute_query &&
        absoluteQueryOptions.filter((o: any) => {
          if (o.value === absolute_query) {
            return true;
          }
          return false;
        });

      timeRangeString = ` for the ${_absoluteQuery[0].label.toLowerCase()}`;
    } catch (e) {
      timeRangeString = "";
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loader.Inline title="Loading" />
      ) : (
        <span className="no-print">
          <div className={isBold ? "font-bold" : ""}>
            {displayString}
            {timeRangeString}
          </div>
        </span>
      )}
    </div>
  );
}

function getTableCountDiv(
  label: string,
  dataArray: any[],
  lastTableState: any,
  totalCount: number,
  page: number,
  isLoading: boolean,
  selectedCount?: number
) {
  let displayString = getTableCountString(
    label,
    dataArray,
    lastTableState,
    totalCount,
    page,
    selectedCount
  );
  return (
    <div>
      {isLoading ? (
        <Loader.Inline title="Loading" />
      ) : (
        <span className="no-print font-bold">{displayString}</span>
      )}
    </div>
  );
}

function linkableTableRow(
  path: string,
  key: string,
  queryParams?: string,
  excludeFirstColFromLink?: boolean,
  excludeLastColFromLink?: boolean
) {
  return ((componentClass, displayName) => {
    // @ts-ignore
    const cmp: any = ({ children, className, ...rest }) => {
      // headings
      if (!rest || !rest[key]) {
        return (
          <div className={componentClass} {...rest}>
            {children}
          </div>
        );
      }

      let firstChild = null;
      let lastChild = null;

      if (excludeFirstColFromLink) {
        firstChild = children[0];
        children = children.splice(1, children.length - 1);
      }
      if (excludeLastColFromLink) {
        lastChild = children[children.length - 1];
        children = children.splice(0, children.length - 1);
      }

      // body
      cmp.displayName = displayName;

      return (
        <div className={componentClass}>
          {firstChild}
          <Link
            className={componentClass}
            to={"/" + path + rest[key] + (queryParams ? queryParams : "")}
            {...rest}
          >
            {children}
          </Link>
          {lastChild}
        </div>
      );
    };
    return cmp;
  })("rt-tr", "Tr");
}

function clickableTableRow(
  key: string,
  excludeFirstColFromLink: boolean,
  excludeLastColFromLink: boolean,
  onClickEvent: any
) {
  return ((componentClass, displayName) => {
    // @ts-ignore
    const cmp: any = ({ children, className, ...rest }) => {
      // headings
      if (!rest || !className) {
        return (
          <div className={componentClass} {...rest}>
            {children}
          </div>
        );
      }

      let lastChild = null;
      let firstChild = null;

      if (excludeFirstColFromLink) {
        firstChild = children[0];
        children = children.splice(1, children.length - 1);
      }
      if (excludeLastColFromLink) {
        lastChild = children[children.length - 1];
        children = children.splice(0, children.length - 1);
      }

      // body
      cmp.displayName = displayName;

      if (typeof onClickEvent === "function") {
        return (
          <div className={"flex items-center"}>
            {firstChild}
            <div
              className={componentClass}
              onClick={() => {
                rest[key] ? onClickEvent(rest[key]) : undefined;
              }}
              {...rest}
            >
              {children}
            </div>
            {lastChild}
          </div>
        );
      }
      return null;
    };
    return cmp;
  })("rt-tr", "Tr");
}

function isItemVisible(item: any, visibleItems: any) {
  return !!visibleItems[item.id];
}

export {
  isItemVisible,
  clickableTableRow,
  linkableTableRow,
  getTableCountDiv,
  getTableCountDivWithDateRangeIndication,
  getTableCountString
};
