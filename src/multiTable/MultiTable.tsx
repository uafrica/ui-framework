import { useEffect, useRef, useState } from "react";
import { Checkbox } from "./../Checkbox";
import { Loader } from "./../Loader";
import { Pagination } from "./../Pagination";

import "./MultiTable.scss";
import * as multiTableUtils from "./multiTableUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultiTableRow from "./MultiTableRow";
import { IColumn } from "./column.interface";
import { IRow } from "./row.interface";

function MultiTable(props: {
  id: string;
  columns: IColumn[];
  columnOrder?: string[];
  columnWidths?: { id: string; value?: number }[];
  pageSize: number;
  loadFunction: Function;
  loadFunctionArguments?: any;
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
  rightClickMenuContent?: any;
}) {
  let {
    id,
    loadFunction,
    loadFunctionArguments,
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
    rightClickMenuContent
  } = props;
  const topRef: any = useRef();
  const rowUniqueIdentifier = props.rowUniqueIdentifier ?? "id";
  const defaultPageSize = 20;

  // loading
  let [isInitialising, setIsInitialising] = useState<boolean>(true);
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [data, setData] = useState<any[]>([]);
  let [error, setError] = useState<any[]>([]);
  let [orderingArguments, setOrderingArguments] = useState<any>({});
  // table render
  let [columns, setColumns] = useState<IColumn[]>(props.columns);
  let [columnOrder, setColumnOrder] = useState<string[]>(
    multiTableUtils.initialiseColumnOrder(props.columns, props.columnOrder)
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
  let [page, setPage] = useState<number>(1);
  let [totalPages, setTotalPages] = useState<number>(0);
  let [pageSize, setPageSize] = useState<number>(props.pageSize ?? defaultPageSize);
  // menu
  let [showMenuRowId, setShowMenuRowId] = useState<any>();
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

  useEffect(() => {
    load(true, page, pageSize);
    manageStaticColumns(props.columns);
  }, []);

  useEffect(() => {
    load(true, page, pageSize);
  }, [loadFunctionArguments, orderingArguments]);

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

  const dragColumnMouseMoveHandler = function (e: any) {
    const table = document.getElementById(props.id);
    const scrollableContainer = document.getElementById(props.id + "_scrollable_container");
    // @ts-ignore
    var rect = table.getBoundingClientRect();

    if (!isDraggingStarted) {
      isDraggingStarted = true;
      setIsDraggingStarted(true);

      list = multiTableUtils.cloneColumnTable(props.id, list);

      draggingElement = [].slice.call(list.children)[draggingColumnIndex];

      draggingElement.classList.add("dragging");

      placeholder = document.createElement("div");
      placeholder.classList.add("placeholder");
      draggingElement.parentNode.insertBefore(placeholder, draggingElement.nextSibling);
      placeholder.style.width = `${draggingElement.offsetWidth}px`;
    }

    draggingElement.style.position = "absolute";
    draggingElement.style.top = `0px`;
    let left = 0;
    let amountScrolled = scrollableContainer?.scrollLeft ?? 0;
    if (e.clientX - rect.x > 0 && e.clientX - rect.x <= rect.width - rect.x) {
      left = e.clientX - rect.x - amountScrolled;
    } else if (e.clientX - rect.x > rect.width - rect.x) {
      left = rect.width - rect.x - amountScrolled;
    }
    draggingElement.style.left = `${left}px`;

    const previousElement = draggingElement.previousElementSibling;
    const nextElement = placeholder.nextElementSibling;

    if (previousElement && multiTableUtils.isOnLeft(draggingElement, previousElement)) {
      multiTableUtils.swap(placeholder, draggingElement);
      multiTableUtils.swap(placeholder, previousElement);
      return;
    }

    if (nextElement && multiTableUtils.isOnLeft(nextElement, draggingElement)) {
      multiTableUtils.swap(nextElement, placeholder);
      multiTableUtils.swap(nextElement, draggingElement);
    }

    setDraggingElement(draggingElement);
    setPlaceholder(placeholder);
  };

  const dragColumnMouseUpHandler = function () {
    const table = document.getElementById(props.id);

    if (table) {
      placeholder && placeholder.parentNode.removeChild(placeholder);
      setPlaceholder(placeholder);
      draggingElement.classList.remove("dragging");
      draggingElement.style.removeProperty("top");
      draggingElement.style.removeProperty("left");
      draggingElement.style.removeProperty("position");
      setDraggingElement(draggingElement);

      // @ts-ignore
      const endColumnIndex = [].slice.call(list.children).indexOf(draggingElement);

      isDraggingStarted = false;
      setIsDraggingStarted(false);

      list.parentNode.removeChild(list);
      setList(list);

      table.querySelectorAll("tr").forEach(function (row) {
        const cells = [].slice.call(row.querySelectorAll("th, td"));
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
      setColumnEventListenersAdded(false);
    }
  };

  function dragRowMouseMoveHandler(e: any) {
    const table = document.getElementById(props.id);
    // @ts-ignore
    var rect = table.getBoundingClientRect();

    if (!isDraggingStarted) {
      isDraggingStarted = true;

      list = multiTableUtils.cloneRowTable(props.id, list);

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
    if (e.clientY - rect.y > 0 && e.clientY - rect.y <= rect.height - rect.y) {
      top = e.clientY - rect.y;
    } else if (e.clientY - rect.y > rect.height - rect.y) {
      top = rect.height - rect.y;
    }
    draggingElement.style.top = `${top}px`;

    const previousElement: any = draggingElement.previousElementSibling;
    const nextElement: any = placeholder.nextElementSibling;

    if (
      previousElement &&
      previousElement.previousElementSibling &&
      multiTableUtils.isAbove(draggingElement, previousElement)
    ) {
      multiTableUtils.swap(placeholder, draggingElement);
      multiTableUtils.swap(placeholder, previousElement);
      return;
    }

    if (nextElement && multiTableUtils.isAbove(nextElement, draggingElement)) {
      multiTableUtils.swap(nextElement, placeholder);
      multiTableUtils.swap(nextElement, draggingElement);
    }

    setDraggingElement(draggingElement);
    setPlaceholder(placeholder);
  }

  function dragRowMouseUpHandler() {
    const table = document.getElementById(props.id);

    if (table) {
      placeholder && placeholder.parentNode.removeChild(placeholder);

      draggingElement.classList.remove("dragging");
      draggingElement.style.removeProperty("top");
      draggingElement.style.removeProperty("left");
      draggingElement.style.removeProperty("position");

      // @ts-ignore
      const endRowIndex = [].slice.call(list.children).indexOf(draggingElement);

      isDraggingStarted = false;

      list.parentNode.removeChild(list);

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

      updateRowOrder();
      table.style.removeProperty("visibility");
      document.removeEventListener("mousemove", dragRowMouseMoveHandler);
      document.removeEventListener("mouseup", dragRowMouseUpHandler);
      setDraggingRowIndex(undefined);
      setRowEventListenersAdded(false);
    }
  }

  const resizeColumnMouseMoveHandler = function (e: any) {
    let newWidth = e.clientX - resizeColumnStartX + resizeColumnStartWidth;

    columnWidths.forEach(c => {
      if (c.id === resizeColumnId) {
        c.value = newWidth;
      }
    });
    changeColumnWidths(columnWidths);
  };

  const resizeColumnMouseUpHandler = function () {
    document.removeEventListener("mousemove", resizeColumnMouseMoveHandler);
    document.removeEventListener("mouseup", resizeColumnMouseUpHandler);

    let column = document.getElementById(resizeColumnId);
    column?.classList.remove("resizable");
    setResizeColumnId("");
    setResizeColumnStartWidth(0);
    setResizeColumnStartX(0);
  };

  function changePageSize(size: number) {
    setPageSize(size);
    if (onPageSizeChanged && !isInitialising) {
      onPageSizeChanged(size);
    }
    load(true, 1, size);
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
    const table = document.getElementById(props.id);
    if (table) {
      let newColumnOrder = [].slice.call(table.querySelectorAll("th")).map((e: any) => {
        return e.id;
      });
      changeColumnOrder(newColumnOrder);
    }
  }

  function updateRowOrder() {
    const table = document.getElementById(props.id);
    if (table) {
      let order = [].slice.call(table.querySelectorAll("tr")).map((e: any) => {
        return e.id;
      });
      let newRowOrder = [...order].slice(1);
      setRowOrder(newRowOrder);
      if (onRowOrderChanged && !isInitialising) {
        onRowOrderChanged(newRowOrder);
      }
    }
  }

  function manageStaticColumns(columns: IColumn[]) {
    if (onSelectionChanged) {
      let selectColumnIndex = columnOrder.indexOf("select");

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
                  // @ts-ignore
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
              checked={multiTableUtils.isRowSelected(
                selectedRowIdentifiers,
                row.original[rowUniqueIdentifier]
              )}
              onClick={() => {
                let selectedIndex = selectedRowIdentifiers.indexOf(
                  // @ts-ignore
                  row.original[rowUniqueIdentifier].toString()
                );
                if (selectedIndex > -1) {
                  setAllRowsSelected(false);
                  selectedRowIdentifiers.splice(selectedIndex, 1);
                  changeSelection(selectedRowIdentifiers);
                } else {
                  // @ts-ignore
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
        columns.splice(0, 0, selectAllColumn);
        columnOrder.splice(0, 0, "select");
      } else {
        columns.splice(selectColumnIndex, 1, selectAllColumn);
        columnOrder.splice(selectColumnIndex, 1, "select");
      }
    }

    if (draggableRows) {
      let rowDragColumnIndex = columnOrder.indexOf("rowDrag");
      let rowDragColumn = {
        width: 30,
        id: "rowDrag",
        accessor: "rowDrag",
        draggable: false,
        sortable: false,
        isClickable: false,
        isRightClickable: false,
        header: <FontAwesomeIcon icon="sort" className="ml-4" title="Drag rows" />,
        cell: (row: IRow) => {
          return (
            <div
              className="cursor-move"
              onMouseDown={() => {
                setDraggingRowIndex(row.index);
              }}
            >
              <FontAwesomeIcon icon="sort" className="ml-4 " />
            </div>
          );
        }
      };
      if (rowDragColumnIndex < 0) {
        columns.splice(0, 0, rowDragColumn);
        columnOrder.splice(0, 0, "rowDrag");
      } else {
        columns.splice(rowDragColumnIndex, 1, rowDragColumn);
        columnOrder.splice(rowDragColumnIndex, 1, "rowDrag");
      }
    }
    setColumns([...columns]);
    setColumnOrder([...columnOrder]);
  }

  async function load(reset: boolean, page: number, pageSize: number) {
    if (loadFunction) {
      if (reset) {
        setIsLoading(true);
      }
      let _page = reset ? 1 : page;

      let offset = pageSize * (_page - 1);
      let pages = 0;
      let args = loadFunctionArguments ?? {};
      if (!noPagination) {
        args.offset = offset;
        args.limit = pageSize;
      }

      if (orderingArguments) {
        args = { ...args, ...orderingArguments };
      }

      let { data, count, error } = await loadFunction(args);

      if (!noPagination) {
        pages = Math.ceil(count / pageSize);
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

  function renderTable() {
    return (
      <div
        className={scrollableX ? "scrollable-table-container" : ""}
        id={id + "_scrollable_container"}
      >
        <table id={id} className="multi-table">
          <thead className="multi-table-head">
            <tr className="multi-table-tr">
              {columnOrder.map((columnId: string, columnIndex: number) => {
                let column: IColumn = multiTableUtils.getColumnById(columns, columnId);
                let columnStyle: any = {};
                let columnContentStyle: any = {};
                let columnWidth = multiTableUtils.getColumnWidth(columnWidths, columnId);
                if (columnWidth) {
                  columnContentStyle.width = columnWidth + "px";
                  columnContentStyle.whiteSpace = "nowrap";
                  columnContentStyle.overflow = "hidden";
                  columnContentStyle.textOverflow = "ellipsis";
                }
                if (multiTableUtils.isColumnDraggable(column)) {
                  columnStyle.cursor = "move";
                } else {
                  columnStyle.cursor = "auto";
                }
                if (multiTableUtils.isColumnSortable(column)) {
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
                      if (multiTableUtils.isColumnDraggable(column)) {
                        setDraggingColumnIndex(columnIndex);
                      }
                    }}
                    className={
                      "multi-table-th lex flex-row justify-between items-center bg-gray-200"
                    }
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row justify-between whitespace-nowrap">
                        <div
                          style={columnContentStyle}
                          onMouseDown={(e: any) => {
                            if (multiTableUtils.isColumnSortable(column)) {
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
                      {multiTableUtils.isColumnResizable(column) ? (
                        <div
                          title="Click and drag to resize"
                          className="resizer"
                          id={column.id + "_resizer"}
                          onMouseDown={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let columnElement = document.getElementById(column.id);

                            if (columnElement) {
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

          <tbody className="multi-table-tbody">
            {rowOrder.map((rowId: any, dataIndex: number) => {
              let rowData = multiTableUtils.getDataByRowId(data, rowUniqueIdentifier, rowId);
              return (
                <MultiTableRow
                  key={rowId}
                  onShowMenu={(rowId: any) => {
                    setShowMenuRowId(rowId);
                  }}
                  showMenu={showMenuRowId === rowId}
                  rowId={rowId}
                  columnOrder={columnOrder}
                  onRowClicked={onRowClicked}
                  dataIndex={dataIndex}
                  rowData={rowData}
                  data={data}
                  setData={changeData}
                  rightClickMenuContent={rightClickMenuContent}
                  columns={columns}
                  columnWidths={columnWidths}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderPagination() {
    return (
      <Pagination
        handler={(val: any) => {
          let _page = page;
          if (val < 1) {
            _page = 1;
          } else if (val <= totalPages) {
            _page = val;
          } else {
            _page = totalPages;
          }
          setPage(_page);
          load(false, _page, pageSize);
        }}
        active={page}
        pages={totalPages}
        setActive={setPage}
        setRows={(val: any) => {
          changePageSize(val);
          setPage(1);
        }}
        rows={pageSize}
        scrollRef={topRef}
      />
    );
  }

  return (
    <div>
      {error}
      {isLoading ? (
        <Loader.Inline />
      ) : (
        <div ref={topRef} className=" multi-table-container">
          {renderTable()}
          {renderPagination()}
        </div>
      )}
    </div>
  );
}

export { MultiTable };
