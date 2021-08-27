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
    <div
      className={
        "flex flex-col-reverse xs:flex-row justify-between mt-2 items-start xs:items-center py-2" +
        (className ? className : "")
      }
    >
      <div className="text-sm">{title}</div>
      <div className="xs:ml-auto flex flex-wrap flex-gap-x-1 flex-grow-0 mb-4 xs:mb-0">
        {props.children}
      </div>
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
      <div className="ml-auto flex flex-wrap flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex-grow-0">
        {props.children}
      </div>
    </div>
  );
}

function PageActionsPanel(props: IProps) {
  let { title } = props;

  return (
    <div className="ua-page-actions-panel flex justify-between flex-col md:flex-row items-start md:items-center z-30 xs:pb-4">
      {title && <PageHeading>{title}</PageHeading>}
      <div className="ua-page-actions-panel-children flex ml-0 xs:ml-auto xs:flex-row flex-col-reverse space-x-0 xs:space-x-4 items-start xs:items-center ">
        {props.children}
      </div>
    </div>
  );
}

function ModalActionsPanel(props: IProps) {
  let { title } = props;

  return (
    <div className="ua-modal-actions-panel flex justify-between flex-col md:flex-row items-start md:items-center z-30 xs:pb-4">
      {title && <PageHeading>{title}</PageHeading>}
      <div className="flex ml-0 xs:ml-auto flex-row space-x-0 space-x-4 items-center ">
        {props.children}
      </div>
    </div>
  );
}

function FiltersPanel(props: IFiltersPanel) {
  let { className, children } = props;

  return (
    <div
      className={
        "ua-filters-panel flex flex-wrap flex-row items-center " + (className ? className : "")
      }
    >
      {children}
    </div>
  );
}

export {
  TableActionsPanel,
  SectionActionsPanel,
  PageActionsPanel,
  FiltersPanel,
  ModalActionsPanel
};
