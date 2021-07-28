// Interface
interface IResponsiveRow {
  children: any;
}

function ResponsiveRow(props: IResponsiveRow) {
  let { children } = props;

  return <div className="flex sm:space-x-4 flex-wrap sm:flex-nowrap">{children}</div>;
}

export default ResponsiveRow;
