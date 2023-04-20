declare function getTableCountString(label: string, dataArray: any[], lastTableState: any, totalCount: number, page: number, selectedCount?: number): string | JSX.Element;
declare function getTableCountDivWithDateRangeIndication(label: string, dataArray: any[], lastTableState: any, totalCount: number, page: number, isLoading: boolean, selectedCount?: number, absolute_query?: string, startDate?: any, endDate?: any, absoluteQueryOptions?: any, isBold?: boolean): JSX.Element;
declare function getTableCountDiv(label: string, dataArray: any[], lastTableState: any, totalCount: number, page: number, isLoading: boolean, selectedCount?: number): JSX.Element;
declare function linkableTableRow(path: string, key: string, queryParams?: string, excludeFirstColFromLink?: boolean, excludeLastColFromLink?: boolean): any;
declare function clickableTableRow(key: string, excludeFirstColFromLink: boolean, excludeLastColFromLink: boolean, onClickEvent: any): any;
declare function isItemVisible(item: any, visibleItems: any): boolean;
export { isItemVisible, clickableTableRow, linkableTableRow, getTableCountDiv, getTableCountDivWithDateRangeIndication, getTableCountString };
