import React, { createContext, useEffect, useState, ReactNode, useRef } from "react";
import "./MultiTable.scss";
import * as multiTableUtils from "./multiTableUtils";
import { Manager, Reference, Popper } from "react-popper";
import { createPortal } from "react-dom";
import { IColumn } from "./column.interface";

function MultiTableRow(props: {
  rowId: any;
  columnOrder: string[];
  onRowClicked?: Function;
  dataIndex: number;
  rowData: any;
  data: any;
  setData: Function;
  showMenu: boolean;
  onShowMenu: Function;
  rightClickMenuContent: any;
  columns: IColumn[];
  columnWidths: { id: string; value?: number }[];
}) {
  let {
    rowId,
    columnOrder,
    onRowClicked,
    dataIndex,
    rowData,
    data,
    setData,
    showMenu,
    onShowMenu,
    rightClickMenuContent,
    columns,
    columnWidths
  } = props;
  const popupNode = useRef<HTMLElement>();
  const ctxValue = useTableMenuCtx(popupNode);

  let [popperXOffset, setPopperXOffset] = useState<number>(0);
  let [popperYOffset, setPopperYOffset] = useState<number>(0);

  function render() {
    useEffect(() => {
      ctxValue.showTableMenu(showMenu);
    }, [showMenu]);

    return (
      <TableMenuCtx.Provider value={ctxValue}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <tr
                ref={ref}
                id={rowId.toString()}
                className={"multi-table-tr hover:bg-gray-100 "}
                onContextMenu={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (rightClickMenuContent) {
                    let row = document.getElementById(rowId.toString());
                    const rowRect: any = row?.getBoundingClientRect();
                    const x = e.clientX - rowRect.left;
                    setPopperXOffset(x);
                    setPopperYOffset(-rowRect.height / 2);

                    onShowMenu(rowId);
                  }
                }}
              >
                {columnOrder.map((columnId: string) => {
                  let column: IColumn = multiTableUtils.getColumnById(columns, columnId);

                  let columnContentStyle: any = {};
                  let columnWidth = multiTableUtils.getColumnWidth(columnWidths, columnId);
                  if (columnWidth) {
                    columnContentStyle.width = columnWidth + "px";
                    columnContentStyle.whiteSpace = "nowrap";
                    columnContentStyle.overflow = "hidden";
                    columnContentStyle.textOverflow = "ellipsis";
                  }
                  return (
                    <td
                      id={columnId ?? ""}
                      key={columnId}
                      className={
                        "multi-table-td pr-4 py-1 " +
                        (onRowClicked && multiTableUtils.isColumnClickable(column)
                          ? "cursor-pointer"
                          : "")
                      }
                      onClick={() => {
                        onShowMenu(null);

                        if (onRowClicked && multiTableUtils.isColumnClickable(column)) {
                          onRowClicked({ index: dataIndex, row: rowData });
                        }
                      }}
                      onMouseDown={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <div style={columnContentStyle}>
                        {column.cell
                          ? column.cell({
                              original: rowData,
                              index: dataIndex,
                              updateRow: (value: any) => {
                                data[dataIndex] = value;
                                setData([...data]);
                              }
                            })
                          : rowData[column.accessor]}
                      </div>
                    </td>
                  );
                })}
              </tr>
            )}
          </Reference>
          <Portal>
            <Popper
              placement={"auto-start"}
              innerRef={node => (popupNode.current = node)}
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [popperXOffset, popperYOffset]
                  }
                }
              ]}
            >
              {({ ref, style }) =>
                ctxValue.isVisible ? (
                  <div
                    className={
                      "z-50 origin-top-right absolute font-normal p-4 w-80 rounded-md shadow-md bg-white divide-y u-black-ring divide-gray-100 focus:outline-none"
                    }
                    // @ts-ignore
                    style={style}
                    ref={ref}
                  >
                    {rightClickMenuContent &&
                      rightClickMenuContent({
                        original: rowData,
                        index: dataIndex,
                        updateRow: (value: any) => {
                          data[dataIndex] = value;
                          setData([...data]);
                        }
                      })}
                  </div>
                ) : null
              }
            </Popper>
          </Portal>
        </Manager>
      </TableMenuCtx.Provider>
    );
  }
  return render();
}

export default MultiTableRow;

function Portal(props: { children: ReactNode }) {
  let { children } = props;
  let [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

interface TableMenuContextType {
  isVisible: boolean;
  showTableMenu: (val: boolean) => void;
}

const TableMenuCtx = createContext<TableMenuContextType>({
  isVisible: false,
  showTableMenu: () => {}
});

export function useTableMenuCtx(
  ref: React.MutableRefObject<HTMLElement | undefined>
): TableMenuContextType {
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    function mouseDownListener(e: MouseEvent) {
      let targetAsNode = e.target;
      // @ts-ignore
      if (ref.current && !ref.current.contains(targetAsNode)) {
        setVisible(false);
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", mouseDownListener);
    }

    return () => {
      document.removeEventListener("mousedown", mouseDownListener);
    };
  }, [isVisible]);

  return {
    isVisible,
    showTableMenu: (val: boolean) => setVisible(val)
  };
}
