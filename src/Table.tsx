const tableBaseClass = "min-w-full divide-y divide-gray-200";
const tableHeadClass = "bg-gray-50";
const tableRowClass = "";
const tableHeadColClass = "px-2 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider";
const tableColClass = "px-2 py-2 whitespace-nowrap text-gray-900";

// Interface
interface IProps {
  className?: string;
  nonScrollable?: boolean;
  children: any;
}

function TableContainer(props: IProps) {
  let { children, className, nonScrollable } = props;

  return (
    <div className="flex flex-col">
      <div className="py-2 align-middle inline-block min-w-full">
        <div
          className={
            "shadow-lg border-gray-200 sm:rounded-lg " + (nonScrollable ? "" : "overflow-x-hidden")
          }
        >
          <div className={nonScrollable ? "" : "overflow-x-auto"}>
            <table className={tableBaseClass + (className ? className : "")}>{children}</table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IHeadProps {
  tableHeadColor?: string;
  restProps?: any;
  children: any;
}

function Head(props: IHeadProps) {
  return (
    <thead className={props.tableHeadColor ? props.tableHeadColor : tableHeadClass} {...props}>
      {props.children}
    </thead>
  );
}

function Row(props: any) {
  return (
    <tr className={tableRowClass} {...props}>
      {props.children}
    </tr>
  );
}

function HeadCol(props: any) {
  return (
    <th
      className={
        tableHeadColClass +
        (props.className ? props.className + " " : "") +
        (props.center ? " text-center " : " text-left ")
      }
      scope="col"
      {...props}
    >
      {props.children}
    </th>
  );
}

function Body(props: any) {
  return <tbody>{props.children}</tbody>;
}

function Col(props: any) {
  return (
    <td
      className={
        tableColClass +
        (props.className ? props.className + " " : "") +
        (props.center ? " text-center " : " text-left ")
      }
      {...props}
    >
      {props.children}
    </td>
  );
}

const Table = {
  Table: TableContainer,
  Head,
  Row,
  HeadCol,
  Body,
  Col
};

export { Table };
