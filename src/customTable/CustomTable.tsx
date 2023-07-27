import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../Checkbox";
import { Loader } from "../Loader";
import { Pagination } from "../Pagination";

import "./CustomTable.scss";
import * as customTableUtils from "./customTableUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomTableRow from "./CustomTableRow";
import { IColumn } from "./column.interface";
import { IRow } from "./row.interface";
import { Message } from "../Message";
import { TableActionsPanel } from "../Panels";
import { Dropdown } from "../Dropdown";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "../Button";

function CustomTable(props: {
  id: string;
  columns: IColumn[];
  columnOrder?: string[];
  columnWidths?: { id: string; value?: number }[];
  pageSize?: number;
  fetchFunction: Function;
  fetchFunctionArguments?: any;
  draggableRows?: boolean;
  rowUniqueIdentifier?: string; // default "id"
  onPageSizeChanged?: Function;
  onRowClicked?: Function;
  onSelectionChanged?: Function;
  onColumnOrderChanged?: Function;
  onRowOrderChanged?: Function;
  onColumnWidthsChanged?: Function;
  onDataChanged?: Function;
  noPagination?: boolean;
  scrollableX?: boolean;
  contextMenuItems?: Function;
  contextMenuHeader?: Function;
  autoRefreshInterval?: number;
  renderTableActionsHeader?: Function;
  renderTableActionsChildren?: Function;
  setTableFunctions?: Function;
  noDataText?: string;
  loadOnPageChange?: boolean;
  rowOrderIcon?: IconProp;
  persistPage?: boolean;
  hideRefreshButton?: boolean;
  rowStyleFunction?: Function;
}) {
  let {
    id,
    fetchFunction,
    fetchFunctionArguments,
    draggableRows,
    onPageSizeChanged,
    onRowClicked,
    onSelectionChanged,
    onColumnOrderChanged,
    onRowOrderChanged,
    onColumnWidthsChanged,
    onDataChanged,
    noPagination,
    scrollableX,
    contextMenuItems,
    contextMenuHeader,
    autoRefreshInterval,
    setTableFunctions,
    noDataText,
    loadOnPageChange,
    rowOrderIcon,
    persistPage,
    hideRefreshButton = false,
    rowStyleFunction
  } = props;
  let topRef: any = useRef();
  let rowUniqueIdentifier = props.rowUniqueIdentifier ?? "id";
  let defaultPageSize = 20;
  let interval: any;

  // loading
  let [isInitialising, setIsInitialising] = useState<boolean>(true);
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [data, setData] = useState<any[]>([]);
  let [error, setError] = useState<any[]>();
  let [orderingArguments, setOrderingArguments] = useState<any>({});
  // table render
  let [columns, setColumns] = useState<IColumn[]>(props.columns);
  let [columnOrder, setColumnOrder] = useState<string[]>(
    customTableUtils.initialiseColumnOrder(props.columns, props.columnOrder)
  );
  let [rowOrder, setRowOrder] = useState<any[]>([]);
  let [columnWidths, setColumnWidths] = useState<{ id: string; value?: number }[]>(
    props.columnWidths && props.columnWidths.length > 0
      ? props.columnWidths
      : props.columns.map(column => {
          return { id: column.id, value: column.width };
        })
  );
  // row selection
  let [selectedRowIdentifiers, setSelectedRowIdentifiers] = useState<string[]>([]);
  let [allRowsSelected, setAllRowsSelected] = useState<boolean>(false);
  // pagination
  let [count, setCount] = useState<number>(1);
  let [page, setPage] = useState<number>(1);
  let [totalPages, setTotalPages] = useState<number>(0);
  let [pageSize, setPageSize] = useState<number>(props.pageSize ?? defaultPageSize);
  // menu
  let [showMenu, setShowMenu] = useState<boolean>(false);
  let [contextMenuMaxHeight, setContextMenuMaxHeight] = useState<any>();
  let [clickPosition, setClickPosition] = useState<any>({ x: 0, y: 0 });
  let [activeRow, setActiveRow] = useState<any>({ rowData: null, dataIndex: null });

  // dragging
  let [list, setList] = useState<any>();
  let [draggingElement, setDraggingElement] = useState<any>();
  let [draggingColumnIndex, setDraggingColumnIndex] = useState<any>();
  let [draggingRowIndex, setDraggingRowIndex] = useState<any>();
  let [placeholder, setPlaceholder] = useState<any>();
  let [isDraggingStarted, setIsDraggingStarted] = useState<boolean>(false);
  let [columnEventListenersAdded, setColumnEventListenersAdded] = useState<boolean>(false);
  let [rowEventListenersAdded, setRowEventListenersAdded] = useState<boolean>(false);
  // column resize
  let [resizeColumnId, setResizeColumnId] = useState<string>("");
  let [resizeColumnStartWidth, setResizeColumnStartWidth] = useState<number>(0);
  let [resizeColumnStartX, setResizeColumnStartX] = useState<number>(0);
  let insertRowRef = useRef(insertRow);
  let refreshRef = useRef(refresh);
  let fetchFunctionArgumentsRef = useRef(fetchFunctionArguments);

  useEffect(() => {
    // rerun when props.columnOrder
    // when the parent component only sets the widths on mount and not in the useState hook call
    setColumnOrder(customTableUtils.initialiseColumnOrder(props.columns, props.columnOrder));
  }, [props.columnOrder]);

  useEffect(() => {
    // when the parent component only sets the widths on mount and not in the useState hook call
    setColumnWidths(
      props.columnWidths && props.columnWidths.length > 0
        ? props.columnWidths
        : props.columns.map(column => {
            return { id: column.id, value: column.width };
          })
    );
  }, [props.columnWidths]);

  useEffect(() => {
    if (setTableFunctions) {
      setTableFunctions({
        insertRow: (object: any, index?: number) => {
          insertRowRef.current(data, rowOrder, object, index ?? 0);
        },
        refresh: () => {
          refreshRef.current();
        }
      });
    }
  }, [data, rowOrder]);

  useEffect(() => {
    if (autoRefreshInterval) {
      startAutoRefreshInterval();
    }
    document.addEventListener("mousedown", hideMenu);

    return () => {
      document.removeEventListener("mousedown", hideMenu);
      if (autoRefreshInterval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    manageStaticColumns(columns);
  }, [data, selectedRowIdentifiers]);

  useEffect(() => {
    fetchFunctionArgumentsRef.current = fetchFunctionArguments;
    if (persistPage) {
      load(false, page, pageSize);
    } else {
      load(true, page, pageSize);
    }
  }, [fetchFunctionArguments]);

  useEffect(() => {
    if (!isInitialising) {
      load(true, page, pageSize);
    }
  }, [orderingArguments]);

  useEffect(() => {
    if (props.pageSize && props.pageSize !== pageSize) {
      changePageSize(props.pageSize, !isInitialising);
    }
  }, [props.pageSize]);

  useEffect(() => {
    // column resize
    if (resizeColumnId !== "") {
      document.addEventListener("mousemove", resizeColumnMouseMoveHandler);
      document.addEventListener("mouseup", resizeColumnMouseUpHandler);
    }
  }, [resizeColumnId]);

  useEffect(() => {
    // column dragging
    if (draggingColumnIndex !== undefined && !columnEventListenersAdded) {
      setColumnEventListenersAdded(true);
      document.addEventListener("mousemove", dragColumnMouseMoveHandler);
      document.addEventListener("mouseup", dragColumnMouseUpHandler);
    }
  }, [draggingColumnIndex]);

  useEffect(() => {
    // row dragging
    if (draggingRowIndex !== undefined && !rowEventListenersAdded) {
      setRowEventListenersAdded(true);
      document.addEventListener("mousemove", dragRowMouseMoveHandler);
      document.addEventListener("mouseup", dragRowMouseUpHandler);
    }
  }, [draggingRowIndex]);

  useEffect(() => {
    // context menu position
    repositionMenu();
  }, [clickPosition]);

  function refresh(shouldLoad?: boolean) {
    load(false, page, pageSize, shouldLoad);
  }

  function insertRow(data: any[], rowOrder: any[], object: any, index: number) {
    data.splice(index, 0, object);
    rowOrder.splice(index, 0, object[rowUniqueIdentifier]);

    setData([...data]);
    setRowOrder([...rowOrder]);
  }

  function hideMenu(e: any) {
    var table = document.getElementById(id);
    var contextMenu = document.getElementById("table-dropdown-menu");

    if (table && !table.contains(e.target) && contextMenu && !contextMenu.contains(e.target)) {
      // do not show menu if click was outside table container
      setShowMenu(false);
    }
  }

  function updateRow(value: any, dataIndex: number) {
    data[dataIndex] = value;
    setData([...data]);
  }

  function removeRow(dataIndex: number) {
    data.splice(dataIndex, 1);
    rowOrder.splice(dataIndex, 1);
    setData([...data]);
    setRowOrder([...rowOrder]);
  }

  function startAutoRefreshInterval() {
    interval = setInterval(() => {
      load(false, page, pageSize);
    }, autoRefreshInterval);
  }

  function dragColumnMouseMoveHandler(e: any) {
    let table = document.getElementById(props.id);
    let scrollableContainer = document.getElementById(props.id + "_scrollable_container");
    if (table && scrollableContainer && draggingElement) {
      let tableBoundaries = table.getBoundingClientRect();
      let scrollableContainerBoundaries = scrollableContainer.getBoundingClientRect();

      if (!isDraggingStarted) {
        isDraggingStarted = true;
        setIsDraggingStarted(true);

        list = customTableUtils.cloneColumnTable(props.id, list);

        draggingElement = [].slice.call(list.children)[draggingColumnIndex];

        draggingElement.classList.add("dragging");
        draggingElement.classList.add("dragging-column");

        placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        draggingElement.parentNode.insertBefore(placeholder, draggingElement.nextSibling);
        placeholder.style.width = `${draggingElement.offsetWidth}px`;
      }

      draggingElement.style.position = "absolute";
      draggingElement.style.top = `0px`;
      let left = 0;

      if (
        scrollableContainerBoundaries.left < e.clientX &&
        e.clientX <= scrollableContainerBoundaries.right
      ) {
        // in scroll range
      } else if (scrollableContainerBoundaries.right < e.clientX) {
        // scroll forward
        scrollableContainer.scrollLeft += 5;
      } else if (scrollableContainerBoundaries.left > e.clientX) {
        // scroll back
        scrollableContainer.scrollLeft -= 5;
      }

      let amountScrolled = scrollableContainer?.scrollLeft ?? 0;

      if (tableBoundaries.left <= e.clientX && e.clientX <= tableBoundaries.right) {
        left = e.clientX + amountScrolled - scrollableContainerBoundaries.left;
      } else if (tableBoundaries.left > e.clientX) {
        // max left reached
        left = 0;
      } else if (e.clientX > tableBoundaries.right) {
        // max right reached
        left = tableBoundaries.right + amountScrolled - scrollableContainerBoundaries.left;
      }

      draggingElement.style.left = `${left}px`;

      let previousElement = draggingElement.previousElementSibling;
      let nextElement = placeholder.nextElementSibling;

      if (previousElement && customTableUtils.isOnLeft(draggingElement, previousElement)) {
        customTableUtils.swap(placeholder, draggingElement);
        customTableUtils.swap(placeholder, previousElement);
        return;
      }

      if (nextElement && customTableUtils.isOnLeft(nextElement, draggingElement)) {
        customTableUtils.swap(nextElement, placeholder);
        customTableUtils.swap(nextElement, draggingElement);
      }

      setDraggingElement(draggingElement);
      setPlaceholder(placeholder);
    }
  }

  function dragColumnMouseUpHandler() {
    let table = document.getElementById(props.id);
    if (table) {
      placeholder && placeholder.parentNode?.removeChild(placeholder);
      setPlaceholder(placeholder);
      draggingElement?.classList.remove("dragging");
      draggingElement?.classList.remove("dragging-column");
      draggingElement?.style.removeProperty("top");
      draggingElement?.style.removeProperty("left");
      draggingElement?.style.removeProperty("position");
      setDraggingElement(draggingElement);
      // @ts-ignore
      let endColumnIndex = [].slice.call(list.children).indexOf(draggingElement);
      isDraggingStarted = false;
      setIsDraggingStarted(false);
      list.parentNode?.removeChild(list);
      setList(list);
      table.querySelectorAll("tr").forEach(function (row) {
        let cells = [].slice.call(row.querySelectorAll("th, td"));
        draggingColumnIndex > endColumnIndex
          ? // @ts-ignore
            cells[endColumnIndex].parentNode.insertBefore(
              cells[draggingColumnIndex],
              cells[endColumnIndex]
            )
          : // @ts-ignore
            cells[endColumnIndex].parentNode.insertBefore(
              cells[draggingColumnIndex],
              // @ts-ignore
              cells[endColumnIndex].nextSibling
            );
      });
      table.style.removeProperty("visibility");
      updateColumnOrder();
      document.removeEventListener("mousemove", dragColumnMouseMoveHandler);
      document.removeEventListener("mouseup", dragColumnMouseUpHandler);
      setDraggingColumnIndex(undefined);
      setColumnEventListenersAdded(false);
    }
  }

  function dragRowMouseMoveHandler(e: any) {
    let table = document.getElementById(props.id);
    if (table) {
      let tableBoundaries = table.getBoundingClientRect();

      if (!isDraggingStarted) {
        isDraggingStarted = true;

        list = customTableUtils.cloneRowTable(props.id, list);

        draggingElement = [].slice.call(list.children)[draggingRowIndex + 1];
        draggingElement.classList.add("dragging");

        placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        draggingElement.parentNode.insertBefore(placeholder, draggingElement.nextSibling);
        placeholder.style.height = `${draggingElement.offsetHeight}px`;
      }

      draggingElement.style.position = "absolute";

      draggingElement.style.left = `0px`;
      let top = 0;
      let tableHeaderHeight = 39;
      let mouseY = e.clientY;
      if (tableBoundaries.top <= mouseY && mouseY <= tableBoundaries.bottom) {
        top = e.clientY - tableBoundaries.top;
      } else if (tableBoundaries.top > mouseY) {
        top = tableBoundaries.top - tableHeaderHeight;
      } else if (mouseY > tableBoundaries.bottom) {
        top = tableBoundaries.bottom - tableBoundaries.top - tableHeaderHeight;
      }

      draggingElement.style.top = `${top}px`;

      let previousElement: any = draggingElement.previousElementSibling;
      let nextElement: any = placeholder.nextElementSibling;

      if (
        previousElement &&
        previousElement.previousElementSibling &&
        customTableUtils.isAbove(draggingElement, previousElement)
      ) {
        customTableUtils.swap(placeholder, draggingElement);
        customTableUtils.swap(placeholder, previousElement);
        return;
      }

      if (nextElement && customTableUtils.isAbove(nextElement, draggingElement)) {
        customTableUtils.swap(nextElement, placeholder);
        customTableUtils.swap(nextElement, draggingElement);
      }

      setDraggingElement(draggingElement);
      setPlaceholder(placeholder);
    }
  }

  function dragRowMouseUpHandler() {
    let table = document.getElementById(props.id);

    if (table) {
      placeholder && placeholder.parentNode?.removeChild(placeholder);

      draggingElement.classList.remove("dragging");
      draggingElement.style.removeProperty("top");
      draggingElement.style.removeProperty("left");
      draggingElement.style.removeProperty("position");

      // @ts-ignore
      let endRowIndex = [].slice.call(list.children).indexOf(draggingElement);

      isDraggingStarted = false;

      list.parentNode?.removeChild(list);

      let rows = [].slice.call(table.querySelectorAll("tr"));

      let _draggingRowIndex = draggingRowIndex + 1;
      _draggingRowIndex > endRowIndex
        ? // @ts-ignore
          rows[endRowIndex].parentNode.insertBefore(rows[_draggingRowIndex], rows[endRowIndex])
        : // @ts-ignore
          rows[endRowIndex].parentNode.insertBefore(
            rows[_draggingRowIndex],
            // @ts-ignore
            rows[endRowIndex].nextSibling
          );

      // pass starting and ending index to update the row order
      updateRowOrder(draggingRowIndex, endRowIndex - 1);
      table.style.removeProperty("visibility");
      document.removeEventListener("mousemove", dragRowMouseMoveHandler);
      document.removeEventListener("mouseup", dragRowMouseUpHandler);
      setDraggingRowIndex(undefined);
      setRowEventListenersAdded(false);
    }
  }

  function resizeColumnMouseMoveHandler(e: any) {
    let newWidth = e.clientX - resizeColumnStartX + resizeColumnStartWidth;

    columnWidths.forEach(c => {
      if (c.id === resizeColumnId) {
        c.value = newWidth;
      }
    });
    changeColumnWidths(columnWidths);
  }

  function resizeColumnMouseUpHandler() {
    document.removeEventListener("mousemove", resizeColumnMouseMoveHandler);
    document.removeEventListener("mouseup", resizeColumnMouseUpHandler);

    let column = document.getElementById(resizeColumnId);
    column?.classList.remove("resizable");
    setResizeColumnId("");
    setResizeColumnStartWidth(0);
    setResizeColumnStartX(0);
  }

  function changePageSize(size: number, doLoad: boolean) {
    setPageSize(size);
    if (onPageSizeChanged && !isInitialising) {
      onPageSizeChanged(size);
    }
    if (doLoad) {
      load(true, 1, size);
    }
  }

  function changeColumnOrder(order: string[]) {
    if (onColumnOrderChanged && !isInitialising) {
      onColumnOrderChanged(order);
    }
    setColumnOrder([...order]);
  }

  function changeColumnWidths(widths: { id: any; value?: number }[]) {
    if (onColumnWidthsChanged && !isInitialising) {
      onColumnWidthsChanged(widths);
    }
    setColumnWidths([...widths]);
  }

  function changeSelection(selectedRowIdentifiers: any[]) {
    let selectedRows = data.filter(d => {
      return selectedRowIdentifiers.indexOf(d[rowUniqueIdentifier].toString()) > -1;
    });
    if (onSelectionChanged && !isInitialising) {
      onSelectionChanged(selectedRows);
    }

    setSelectedRowIdentifiers([...selectedRowIdentifiers]);
  }

  function changeData(data: any[]) {
    if (onDataChanged && !isInitialising) {
      onDataChanged(data);
    }
    setData([...data]);
  }

  function updateColumnOrder() {
    let table = document.getElementById(props.id);
    if (table) {
      let newColumnOrder = [].slice.call(table.querySelectorAll("th")).map((e: any) => {
        return e.id;
      });
      changeColumnOrder(newColumnOrder);
    }
  }

  function updateRowOrder(startingIndex: any, endingIndex: any) {
    let table = document.getElementById(props.id);
    if (table) {
      let order = [].slice.call(table.querySelectorAll("tr")).map((e: any) => {
        return e.id;
      });
      let newRowOrder = {
        order: [...order].slice(1),
        startingIndex: startingIndex,
        endingIndex: endingIndex
      };

      setRowOrder(newRowOrder.order);
      if (onRowOrderChanged && !isInitialising) {
        onRowOrderChanged(newRowOrder);
      }
    }
  }

  function manageStaticColumns(columns: IColumn[]) {
    let newColumns = [...columns];
    let newColumnOrder = [...columnOrder];

    if (onSelectionChanged) {
      let selectColumnIndex = newColumnOrder.indexOf("select");

      let selectAllColumn = {
        width: 30,
        id: "select",
        accessor: "select",
        draggable: false,
        sortable: false,
        isClickable: false,
        isRightClickable: false,

        header: (
          <Checkbox
            hoverTitle={allRowsSelected ? "Deselect all" : "Select all"}
            checked={allRowsSelected}
            onClick={() => {
              if (allRowsSelected) {
                setAllRowsSelected(false);
                changeSelection([]);
              } else {
                let _selected: any = [];
                for (let i = 0; i < data.length; i++) {
                  _selected.push(data[i][rowUniqueIdentifier].toString());
                }

                setAllRowsSelected(true);
                changeSelection(_selected);
              }
            }}
          />
        ),
        cell: (row: IRow) => {
          return (
            <Checkbox
              checked={customTableUtils.isRowSelected(
                selectedRowIdentifiers,
                row.original[rowUniqueIdentifier]
              )}
              onClick={() => {
                let selectedIndex = selectedRowIdentifiers.indexOf(
                  row.original[rowUniqueIdentifier].toString()
                );
                if (selectedIndex > -1) {
                  setAllRowsSelected(false);
                  selectedRowIdentifiers.splice(selectedIndex, 1);
                  changeSelection(selectedRowIdentifiers);
                } else {
                  selectedRowIdentifiers.push(row.original[rowUniqueIdentifier].toString());
                  if (selectedRowIdentifiers.length === pageSize) {
                    setAllRowsSelected(true);
                  }
                  changeSelection(selectedRowIdentifiers);
                }
              }}
            />
          );
        }
      };

      if (selectColumnIndex < 0) {
        newColumns.splice(0, 0, selectAllColumn);
        newColumnOrder.splice(0, 0, "select");
      } else {
        newColumns.splice(selectColumnIndex, 1, selectAllColumn);
        newColumnOrder.splice(selectColumnIndex, 1, "select");
      }
    }

    if (draggableRows) {
      let rowDragColumnIndex = newColumnOrder.indexOf("rowDrag");
      let rowDragColumn = {
        width: 30,
        id: "rowDrag",
        accessor: "rowDrag",
        draggable: false,
        sortable: false,
        isClickable: false,
        isRightClickable: false,
        header: (
          <FontAwesomeIcon
            // @ts-ignore
            icon={`${rowOrderIcon ? rowOrderIcon : "sort"}`}
            className="ml-4"
            title="Drag rows"
          />
        ),
        cell: (row: IRow) => {
          return (
            <div
              className="cursor-move"
              onMouseDown={() => {
                setDraggingRowIndex(row.index);
              }}
            >
              <FontAwesomeIcon
                // @ts-ignore
                icon={`${rowOrderIcon ? rowOrderIcon : "sort"}`}
                className="ml-4 "
              />
            </div>
          );
        }
      };
      if (rowDragColumnIndex < 0) {
        newColumns.splice(0, 0, rowDragColumn);
        newColumnOrder.splice(0, 0, "rowDrag");
      } else {
        newColumns.splice(rowDragColumnIndex, 1, rowDragColumn);
        newColumnOrder.splice(rowDragColumnIndex, 1, "rowDrag");
      }
    }

    setColumns([...newColumns]);
    setColumnOrder([...newColumnOrder]);
  }

  async function load(reset: boolean, page: number, pageSize: number, shouldLoad?: boolean) {
    if (fetchFunction) {
      if (reset || shouldLoad) {
        setIsLoading(true);
      }
      let _page = reset ? 1 : page;

      let offset = pageSize * (_page - 1);
      let pages = 0;
      let args = fetchFunctionArgumentsRef.current ?? {};
      if (!noPagination) {
        args.offset = offset;
        args.limit = pageSize;
      }

      if (orderingArguments) {
        args = { ...args, ...orderingArguments };
      }

      let { data, count, error } = await fetchFunction(args);

      if (!data) {
        data = [];
      }

      if (!noPagination) {
        pages = Math.ceil(count / pageSize);
        setCount(count);
        setPage(_page);
        setTotalPages(pages);
      }

      setRowOrder(
        data.map((d: any) => {
          return d[rowUniqueIdentifier];
        })
      );
      changeData(data);

      setError(error);
      setIsLoading(false);
      setIsInitialising(false);
    }
  }

  function repositionMenu() {
    // witchcraft to prevent long context menus from falling off bottom of screen
    let contextMenuElement = document.getElementById("table-dropdown-menu");
    let contextMenuContentElement = document.getElementById("context-content");
    if (!contextMenuElement || !contextMenuContentElement) return;
    const height = contextMenuContentElement.clientHeight + 20;
    var space = window.innerHeight - clickPosition.y;
    contextMenuElement.style.position = "fixed";

    if (height > space) {
      setContextMenuMaxHeight(window.innerHeight);
      let top = 0;
      if (window.innerHeight - height > 0) {
        top = window.innerHeight - height;
      }
      contextMenuElement.style.top = `${top}px`;
      contextMenuElement.style.left = `${clickPosition.x}px`;
    } else {
      contextMenuElement.style.top = `${clickPosition.y}px`;
      contextMenuElement.style.left = `${clickPosition.x}px`;
    }
  }
  function renderEmptyRow() {
    return (
      <tr>
        <td colSpan={columnOrder.length} className="h-12"></td>
      </tr>
    );
  }

  function renderTable() {
    return (
      <div
        className={"rounded-lg " + (scrollableX ? "scrollable-table-container" : "")}
        id={id + "_scrollable_container"}
      >
        <table id={id} className="custom-table">
          <thead className="custom-table-head">
            <tr className="custom-table-tr">
              {columnOrder.map((columnId: string, columnIndex: number) => {
                let column: IColumn = customTableUtils.getColumnById(columns, columnId);
                let columnStyle: any = {};
                let columnContentStyle: any = {};
                let columnWidth = customTableUtils.getColumnWidth(columnWidths, columnId);
                if (columnWidth) {
                  if (scrollableX) {
                    columnContentStyle.width = columnWidth + "px";
                  } else {
                    columnContentStyle.maxWidth = columnWidth + "px";
                  }
                  columnStyle.width = columnWidth + "px";
                  columnContentStyle.whiteSpace = "nowrap";
                  columnContentStyle.overflow = "hidden";
                  columnContentStyle.textOverflow = "ellipsis";
                }
                if (customTableUtils.isColumnDraggable(column)) {
                  columnStyle.cursor = "move";
                } else {
                  columnStyle.cursor = "auto";
                }
                if (customTableUtils.isColumnSortable(column)) {
                  columnContentStyle.cursor = "pointer";
                } else {
                  columnContentStyle.cursor = "auto";
                }

                return (
                  <th
                    style={columnStyle}
                    id={columnId}
                    key={columnId}
                    onMouseDown={() => {
                      if (customTableUtils.isColumnDraggable(column) && !isLoading) {
                        setDraggingColumnIndex(columnIndex);
                      }
                    }}
                    className={"custom-table-th justify-between items-center font-bold"}
                  >
                    <div className="flex flex-row justify-between items-center ">
                      <div className="flex flex-row justify-between whitespace-nowrap mx-2">
                        <div
                          style={columnContentStyle}
                          onMouseDown={(e: any) => {
                            if (customTableUtils.isColumnSortable(column) && !isLoading) {
                              e.stopPropagation();
                              let args = { order: "DESC", order_by: column.accessor };
                              if (orderingArguments.order === "DESC") {
                                args.order = "ASC";
                              }
                              setOrderingArguments(args);
                            }
                          }}
                        >
                          {typeof column.header === "function" ? column.header() : column.header}
                        </div>
                      </div>
                      {customTableUtils.isColumnResizable(column) ? (
                        <div
                          title="Click and drag to resize"
                          className="resizer"
                          id={column.id + "_resizer"}
                          onMouseDown={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let columnElement = document.getElementById(column.id);

                            if (columnElement && !isLoading) {
                              columnElement?.classList.add("resizable");

                              let columnStyles = window.getComputedStyle(columnElement);
                              setResizeColumnStartWidth(parseInt(columnStyles.width, 10));
                              setResizeColumnStartX(e.clientX);
                              setResizeColumnId(column.id);
                            }
                          }}
                        />
                      ) : (
                        <div
                          className="resizer-placeholder"
                          onMouseDown={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="custom-table-tbody">
            {rowOrder && rowOrder.length > 0
              ? rowOrder.map((rowId: any, dataIndex: number) => {
                  let rowData = customTableUtils.getDataByRowId(data, rowUniqueIdentifier, rowId);
                  return (
                    <CustomTableRow
                      rowStyleFunction={rowStyleFunction}
                      isLoading={isLoading}
                      key={rowId}
                      onShowMenu={(show: boolean) => {
                        setShowMenu(show);
                      }}
                      rowId={rowId}
                      columnOrder={columnOrder}
                      onRowClicked={onRowClicked}
                      dataIndex={dataIndex}
                      rowData={rowData}
                      data={data}
                      setData={changeData}
                      columns={columns}
                      columnWidths={columnWidths}
                      updateRow={updateRow}
                      removeRow={removeRow}
                      onRightClick={(event: any, rowData: any, dataIndex: number) => {
                        setActiveRow({ rowData, dataIndex });
                        setShowMenu(true);
                        setClickPosition({ x: event?.pageX, y: event?.pageY });
                      }}
                    />
                  );
                })
              : renderEmptyRow()}
          </tbody>
        </table>
      </div>
    );
  }

  function renderPagination() {
    return (
      !noPagination && (
        <div className="-mt-3">
          <Pagination
            handler={(val: any) => {
              let _page;
              const parsedVal: number = parseInt(val);
              if (parsedVal < 1) {
                _page = 1;
              } else if (parsedVal <= totalPages) {
                _page = parsedVal;
              } else {
                _page = totalPages;
              }
              setPage(_page);
              load(false, _page, pageSize, loadOnPageChange);
            }}
            active={page}
            pages={totalPages}
            setActive={setPage}
            setRows={(val: any) => {
              const parsedVal: number = parseInt(val);
              changePageSize(parsedVal, true);
              setPage(1);
            }}
            rows={pageSize}
            scrollRef={topRef}
          />
        </div>
      )
    );
  }

  function renderTableActions() {
    let title = "";
    if (props.renderTableActionsHeader) {
      title = props.renderTableActionsHeader(data, count, page, pageSize, isLoading);
    }

    if (props.renderTableActionsHeader || props.renderTableActionsChildren) {
      return (
        props.renderTableActionsHeader && (
          <TableActionsPanel title={title}>
            {props.renderTableActionsChildren && props.renderTableActionsChildren(data, isLoading)}
            {!hideRefreshButton && (
              <Button.Link
                color="black"
                title="Refresh"
                onClick={() => {
                  refreshRef.current(true);
                }}
                icon="redo-alt"
              />
            )}
          </TableActionsPanel>
        )
      );
    }
    return null;
  }

  function renderContextMenu() {
    return (
      showMenu &&
      (contextMenuHeader || contextMenuItems) && (
        <Dropdown.ContextMenu id="table-dropdown-menu">
          <div
            id="context-content"
            style={{
              maxHeight: contextMenuMaxHeight,
              overflowY: "scroll"
            }}
          >
            {contextMenuHeader && (
              <>
                <label className="text-center block pb-2">
                  {contextMenuHeader({
                    original: activeRow.rowData,
                    index: activeRow.dataIndex,
                    updateRow: (value: any) => {
                      updateRow(value, activeRow.dataIndex);
                    },
                    removeRow: () => {
                      removeRow(activeRow.dataIndex);
                    }
                  })}
                </label>
                <hr />
              </>
            )}
            {contextMenuItems && (
              <label className="text-left block">
                {contextMenuItems({
                  original: activeRow.rowData,
                  index: activeRow.dataIndex,
                  updateRow: (value: any) => {
                    updateRow(value, activeRow.dataIndex);
                  },
                  removeRow: () => {
                    removeRow(activeRow.dataIndex);
                  }
                })}
              </label>
            )}
          </div>
        </Dropdown.ContextMenu>
      )
    );
  }

  function render() {
    return (
      <div>
        {error && <Message.Error>{error}</Message.Error>}
        {isLoading && data.length === 0 ? (
          <Loader.Inline />
        ) : (
          <div>
            {renderTableActions()}

            <div ref={topRef} className=" custom-table-container rounded-lg relative">
              {rowOrder && rowOrder.length === 0 && (
                <div className="no-data">{noDataText ?? "No data"}</div>
              )}
              {renderTable()}
              {renderPagination()}
              {renderContextMenu()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return render();
}

export { CustomTable };
