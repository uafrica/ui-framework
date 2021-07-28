const tableBaseClass = "min-w-full divide-y divide-gray-200";
const tableHeadClass = "bg-gray-50";
const tableRowClass = "";
const tableHeadColClass = "px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider";
const tableColClass = "px-2 whitespace-nowrap text-gray-900";

// Interface
interface IProps {
  className?: string;
  children: any;
}

function TableContainer(props: IProps) {
  let { children, className } = props;

  return (
    <div className="flex flex-col">
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="shadow-lg overflow-hidden border-gray-200 sm:rounded-lg pb-4">
          <div className="overflow-x-auto">
            <table className={tableBaseClass + (className ? className : "")}>{children}</table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Head(props: any) {
  return <thead className={tableHeadClass}>{props.children}</thead>;
}

function Row(props: any) {
  return <tr className={tableRowClass}>{props.children}</tr>;
}

function HeadCol(props: any) {
  return (
    <th
      className={tableHeadColClass + (props.center ? " text-center " : " text-left ")}
      scope="col"
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
    <td className={tableColClass + (props.center ? " text-center " : " text-left ")}>
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
