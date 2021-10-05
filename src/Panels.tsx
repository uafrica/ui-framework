import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "./Button";
import { PageHeading } from "./PageHeading";
import { SectionHeading } from "./SectionHeading";

// Interface
interface IProps {
  children?: any;
  title?: any;
  className?: string;
  onClose?: any;
}

interface IPageActionsPanelProps {
  children?: any;
  title?: any;
  className?: string;
  onClose?: any;
  icon?: IconProp;
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
    <div className={"u-panel " + (className ? className : "")}>
      {title && (
        <SectionHeading toggleEditMode={toggleEditMode} hideEditMode={hideEditMode} noMarginBottom>
          {title}
        </SectionHeading>
      )}
      <div className="ml-auto u-vertical-center flex-wrap flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex-grow-0 w-full md:w-auto justify-end">
        {props.children}
      </div>
    </div>
  );
}

function PageActionsPanel(props: IPageActionsPanelProps) {
  let { title, icon } = props;

  return (
    <div className="ua-page-actions-panel u-panel xs:pb-4">
      {title && <PageHeading icon={icon}>{title}</PageHeading>}
      <div className="ua-page-actions-panel-children ml-0 xs:ml-auto u-reverse-flex-col-to-row items-start xs:items-center ">
        {props.children}
      </div>
    </div>
  );
}

function ModalActionsPanel(props: IProps) {
  let { title, onClose } = props;

  return (
    <div className="ua-modal-actions-panel u-panel pb-4">
      <div className="u-vertical-center justify-between w-full md:w-auto">
        <div>{title && <PageHeading>{title}</PageHeading>}</div>
        <div>
          {onClose && (
            <div className="block md:hidden" onClick={onClose}>
              <Button.Close onClick={onClose} />
            </div>
          )}
        </div>
      </div>
      <div className="u-horizontal-center flex-row  space-x-4 items-center w-full md:w-auto  flex-wrap pt-2">
        {props.children}
        {onClose && (
          <div className="hidden md:block" onClick={onClose}>
            <Button.Close onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}

function FiltersPanel(props: IFiltersPanel) {
  let { className, children } = props;

  return (
    <div
      className={
        "ua-filters-panel u-vertical-center flex-wrap flex-row " + (className ? className : "")
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
