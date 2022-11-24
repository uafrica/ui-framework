import { IColumn } from "./column.interface";

/** TABLE CLONING */
function cloneColumnTable(tableId: any, list: any) {
  const table = document.getElementById(tableId);

  if (table) {
    list = document.createElement("div");
    list.classList.add("clone-list");
    list.style.position = "absolute";
    // @ts-ignore
    table.parentNode.insertBefore(list, table);

    table.style.visibility = "hidden";

    const originalCells = [].slice.call(table.querySelectorAll("tbody td"));

    const originalHeaderCells = [].slice.call(table.querySelectorAll("th"));
    const columnCount = originalHeaderCells.length;

    originalHeaderCells.forEach(function (headerCell, headerIndex) {
      const width = parseInt(window.getComputedStyle(headerCell).width);
      const height = parseInt(window.getComputedStyle(originalCells[0]).height);

      const item = document.createElement("div");
      item.classList.add("draggable");

      const newTable = document.createElement("table");
      newTable.setAttribute("class", "clone-table");
      newTable.style.width = `${width}px`;

      // @ts-ignore
      const th = headerCell.cloneNode(true);
      let newRow = document.createElement("tr");
      newRow.classList.add("custom-table-tr");

      newRow.appendChild(th);
      newTable.appendChild(newRow);

      const cells = originalCells.filter(function (_, idx) {
        return (idx - headerIndex) % columnCount === 0;
      });
      cells.forEach(function (cell) {
        // @ts-ignore
        const newCell = cell.cloneNode(true);
        newCell.style.width = `${width}px`;
        newCell.style.height = `${height}px`;

        newRow = document.createElement("tr");
        newRow.classList.add("custom-table-tr");

        newRow.appendChild(newCell);

        newTable.appendChild(newRow);
      });

      item.appendChild(newTable);
      list.appendChild(item);
    });
    return list;
  }
}

function cloneRowTable(tableId: any, list: any) {
  const table = document.getElementById(tableId);
  if (table) {
    const width = parseInt(window.getComputedStyle(table).width);

    list = document.createElement("div");
    list.classList.add("clone-list");
    list.classList.add("flex-col");
    list.style.position = "absolute";
    // @ts-ignore
    table.parentNode.insertBefore(list, table);

    table.style.visibility = "hidden";

    let originalRows = table.querySelectorAll("tr");

    originalRows.forEach(function (originalRow) {
      const item = document.createElement("div");
      item.classList.add("draggable");

      const newTable = document.createElement("table");
      newTable.setAttribute("class", "clone-table");
      newTable.style.width = `${width}px`;

      const newRow = document.createElement("tr");
      newRow.classList.add("custom-table-tr");
      const cells = [].slice.call(originalRow.children);
      cells.forEach(function (cell) {
        // @ts-ignore
        const newCell = cell.cloneNode(true);
        newCell.style.width = `${parseInt(window.getComputedStyle(cell).width)}px`;
        newRow.appendChild(newCell);
      });

      newTable.appendChild(newRow);
      item.appendChild(newTable);
      list.appendChild(item);
    });
    return list;
  }
}

/** COLUMN & ROW DRAGGING */
const isOnLeft = function (nodeA: any, nodeB: any) {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();

  return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
};

const isAbove = function (nodeA: any, nodeB: any) {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();

  return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const swap = function (nodeA: any, nodeB: any) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  nodeB.parentNode.insertBefore(nodeA, nodeB);

  parentA.insertBefore(nodeB, siblingA);
};

/** GENERAL */
function isColumnClickable(column: IColumn) {
  return column.isClickable === undefined ? true : column.isClickable;
}
function isColumnDraggable(column: IColumn) {
  return column.draggable === undefined ? true : column.draggable;
}

function isColumnSortable(column: IColumn) {
  return column.sortable === undefined ? true : column.sortable;
}
function isColumnResizable(column: IColumn) {
  return column.resizable === undefined ? true : column.resizable;
}

function isRowSelected(selectedRowIdentifiers: string[], rowId: any): boolean {
  return selectedRowIdentifiers.indexOf(rowId.toString()) > -1;
}

function getColumnById(columns: IColumn[], columnId: string) {
  let column: any = {};

  columns.forEach(c => {
    if (c.id === columnId) {
      column = c;
    }
  });

  return column;
}

function getColumnWidth(columnWidths: { id: string; value?: number }[], columnId: string) {
  let width: any = null;

  columnWidths.forEach(c => {
    if (c.id === columnId) {
      width = c.value;
    }
  });

  return width;
}

function initialiseColumnOrder(columns: IColumn[], columnOrder?: string[]) {
  let definedColumns = columns.map((column: any) => {
    return column.id;
  });
  if (columnOrder) {
    let _columnOrder: string[] = [];

    columnOrder.forEach((c: any) => {
      let index = definedColumns.indexOf(c);
      if (index > -1) {
        // column still existis in list of defined columns
        _columnOrder.push(c);
      }
    });

    definedColumns.forEach((c: any) => {
      let index = columnOrder?.indexOf(c);
      if (index === -1) {
        // defined column does not exist in provided order
        _columnOrder.push(c);
      }
    });

    return _columnOrder;
  } else {
    return definedColumns;
  }
}

function getDataByRowId(data: any, rowUniqueIdentifier: any, rowId: any) {
  let row: any = {};

  data.forEach((d: any) => {
    if (d[rowUniqueIdentifier].toString() === rowId.toString()) {
      row = d;
    }
  });

  return row;
}

export {
  cloneColumnTable,
  cloneRowTable,
  isOnLeft,
  isAbove,
  swap,
  isColumnClickable,
  isColumnDraggable,
  isColumnSortable,
  isColumnResizable,
  isRowSelected,
  getColumnById,
  getColumnWidth,
  initialiseColumnOrder,
  getDataByRowId
};
