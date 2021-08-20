import { PageHeading } from "./PageHeading";
import { SectionHeading } from "./SectionHeading";

// Interface
interface IProps {
  children?: any;
  title?: any;
  className?: string;
}

interface ISectionActionsPanel {
  children?: any;
  title?: any;
  className?: string;
  toggleEditMode?: any;
  hideEditMode?: boolean;
}

interface IFiltersPanel {
  children?: any;
  className?: string;
}

// Implementation
function TableActionsPanel(props: IProps) {
  let { title, className } = props;

  return (
    <div className={"flex justify-between mt-2 items-center py-2" + (className ? className : "")}>
      <div className="text-sm">{title}</div>
      <div className="ml-auto flex flex-gap-x-1 flex-grow-0">{props.children}</div>
    </div>
  );
}

function SectionActionsPanel(props: ISectionActionsPanel) {
  let { title, className, toggleEditMode, hideEditMode } = props;

  return (
    <div className={"flex justify-between " + (className ? className : "")}>
      {title && (
        <SectionHeading toggleEditMode={toggleEditMode} hideEditMode={hideEditMode}>
          {title}
        </SectionHeading>
      )}
      <div className="ml-auto flex flex-row space-x-4 flex-grow-0">{props.children}</div>
    </div>
  );
}

function PageActionsPanel(props: IProps) {
  let { title } = props;

  return (
    <div className="page-actions-panel flex justify-between flex-col md:flex-row items-start md:items-center z-30 pb-4">
      {title && <PageHeading>{title}</PageHeading>}
      <div className="-ml-3 md:ml-auto flex flex-row space-x-4 items-center">{props.children}</div>
    </div>
  );
}

function FiltersPanel(props: IFiltersPanel) {
  let { className, children } = props;

  return (
    <div className={"flex flex-row space-x-4 " + (className ? className : "")}>{children}</div>
  );
}

export { TableActionsPanel, SectionActionsPanel, PageActionsPanel, FiltersPanel };
