import "./CustomTable.scss";
import * as customTableUtils from "./customTableUtils";
import { IColumn } from "./column.interface";

function CustomTableRow(props: {
  rowId: any;
  columnOrder: string[];
  onRowClicked?: Function;
  dataIndex: number;
  rowData: any;
  data: any;
  setData: Function;
  onShowMenu: Function;
  columns: IColumn[];
  columnWidths: { id: string; value?: number }[];
  updateRow: Function;
  removeRow: Function;
  onRightClick: any;
}) {
  let { rowId, columnOrder, onRowClicked, dataIndex, rowData, onShowMenu, columns, columnWidths } =
    props;

  function render() {
    return (
      <tr id={rowId.toString()} className={"custom-table-tr hover:bg-gray-100 "}>
        {columnOrder.map((columnId: string) => {
          let column: IColumn = customTableUtils.getColumnById(columns, columnId);

          let columnContentStyle: any = {};
          let columnWidth = customTableUtils.getColumnWidth(columnWidths, columnId);
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
                (onRowClicked && customTableUtils.isColumnClickable(column) ? "cursor-pointer" : "")
              }
              onClick={() => {
                onShowMenu(false);

                if (onRowClicked && customTableUtils.isColumnClickable(column)) {
                  onRowClicked({
                    index: dataIndex,
                    row: rowData,
                    updateRow: (value: any) => {
                      props.updateRow(value, dataIndex);
                    },
                    removeRow: () => {
                      props.removeRow(dataIndex);
                    }
                  });
                }
              }}
              onContextMenu={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                props.onRightClick(e, rowData, dataIndex);
              }}
              onMouseDown={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div style={columnContentStyle} className="flex flex-row items-center mx-2">
                {column.cell
                  ? column.cell({
                      original: rowData,
                      index: dataIndex,
                      updateRow: (value: any) => {
                        props.updateRow(value, dataIndex);
                      },
                      removeRow: () => {
                        props.removeRow(dataIndex);
                      }
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
