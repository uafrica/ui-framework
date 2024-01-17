import * as customTableUtils from "./customTableUtils";
 // @ts-ignore
    import React from "react";
import { IColumn } from "./column.interface";
import "./CustomTable.scss";
import { ICustomTableRow } from "./customTableRow.interface";

function CustomTableRow(props: ICustomTableRow) {
  let {
    rowId,
    columnOrder,
    onRowClicked,
    dataIndex,
    rowData,
    onShowMenu,
    columns,
    columnWidths,
    isLoading,
    rowStyleFunction,
  } = props;

  function render() {
    let rowStyle = {};
    if (rowStyleFunction) {
      rowStyle = rowStyleFunction({ index: dataIndex, original: rowData });
    }
    return (
      <tr
        style={rowStyle}
        id={rowId.toString()}
        className={
          "custom-table-tr hover:bg-gray-100 " +
          (isLoading ? "bg-gray-50 text-gray-300" : "")
        }
      >
        {columnOrder.map((columnId: string) => {
          let column: IColumn = customTableUtils.getColumnById(
            columns,
            columnId
          );

          let columnContentStyle: any = {};
          let columnWidth = customTableUtils.getColumnWidth(
            columnWidths,
            columnId
          );
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
                "custom-table-td pr-4 py-2 mx-1 " +
                (onRowClicked && customTableUtils.isColumnClickable(column)
                  ? "cursor-pointer"
                  : "")
              }
              onClick={(e: any) => {
                onShowMenu(false);

                if (
                  onRowClicked &&
                  customTableUtils.isColumnClickable(column) &&
                  !isLoading
                ) {
                  onRowClicked({
                    index: dataIndex,
                    original: rowData,
                    updateRow: (value: any) => {
                      props.updateRow(value, dataIndex);
                    },
                    removeRow: () => {
                      props.removeRow(dataIndex);
                    },
                    e: e,
                  });
                }
              }}
              onContextMenu={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isLoading) {
                  props.onRightClick(e, rowData, dataIndex);
                }
              }}
              onMouseDown={(e: any) => {
                if (e.button === 0 && e.buttons === 1) {
                  // right click (allows text selection)
                } else {
                  // left click
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <div style={columnContentStyle} className="items-center mx-2 ">
                {column.cell
                  ? column.cell({
                      original: rowData,
                      index: dataIndex,
                      updateRow: (value: any) => {
                        props.updateRow(value, dataIndex);
                      },
                      removeRow: () => {
                        props.removeRow(dataIndex);
                      },
                    })
                  : rowData[column.accessor]}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }
  return render();
}

export default CustomTableRow;
