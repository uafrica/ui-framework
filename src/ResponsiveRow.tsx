// Interface
interface IResponsiveRow {
  children: any;
  verticalCenter?: boolean;
}

function ResponsiveRow(props: IResponsiveRow) {
  let { children, verticalCenter } = props;

  return (
    <div
      className={
        "flex sm:space-x-4 flex-wrap sm:flex-nowrap " + (verticalCenter ? "items-center" : "")
      }
    >
      {children}
    </div>
  );
}

export default ResponsiveRow;
