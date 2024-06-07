// @ts-ignore
import React from "react";
import { Button } from "./Button";
import { PageHeading } from "./PageHeading";
import { SectionHeading } from "./SectionHeading";
import {
  IFiltersPanel,
  IPageActionsPanelProps,
  IPanel,
  ISectionActionsPanel,
} from "./interfaces/panel.interface";

// Implementation
function TableActionsPanel(props: IPanel) {
  let { title, className } = props;

  return (
    <div
      className={
        "flex flex-col-reverse md:flex-row md:justify-between mt-2 md:items-center py-2" +
        (className ? className : "")
      }
    >
      <div className="text-sm">{title}</div>
      <div className="flex flex-col md:flex-row justify-end md:items-center">
        {props.children}
      </div>
    </div>
  );
}

function SectionActionsPanel(props: ISectionActionsPanel) {
  let { title, className, toggleEditMode, hideEditMode, icon, iconColor } =
    props;
  return (
    <div
      className={
        " flex justify-between flex-col md:flex-row items-start md:items-center z-30  " +
        (className ? className : "")
      }
    >
      {title && (
        <SectionHeading
          icon={icon}
          iconColor={iconColor}
          toggleEditMode={toggleEditMode}
          hideEditMode={hideEditMode}
          noMarginBottom
        >
          {title}
        </SectionHeading>
      )}
      <div className="ml-auto  flex items-center  flex-wrap flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex-grow-0 w-full md:w-auto justify-end">
        {props.children}
      </div>
    </div>
  );
}

function PageActionsPanel(props: IPageActionsPanelProps) {
  let { title, icon, shouldNotUppercase } = props;

  return (
    <div className="ua-page-actions-panel flex justify-between flex-col md:flex-row items-start md:items-center z-30  xs:pb-4">
      {title && (
        <PageHeading icon={icon} shouldNotUppercase={shouldNotUppercase}>
          {title}
        </PageHeading>
      )}
      <div className="ua-page-actions-panel-children ml-0 xs:ml-auto  flex flex-col-reverse sm:flex-row space-y-4 sm:space-y-0 space-y-reverse space-x-0 sm:space-x-4  items-start xs:items-center ">
        {props.children}
      </div>
    </div>
  );
}

function ModalActionsPanel(props: IPanel) {
  let { title, onClose } = props;

  return (
    <div className="ua-modal-actions-panel  flex justify-between flex-col md:flex-row items-start md:items-center z-30  pb-4">
      <div className=" flex items-center  justify-between w-full md:w-auto">
        <div>{title && <PageHeading>{title}</PageHeading>}</div>
        <div>
          {onClose && (
            <div
              className="block md:hidden"
              onClick={(e) => {
                if (onClose) {
                  onClose(e);
                }
              }}
            >
              <Button.Close onClick={onClose} />
            </div>
          )}
        </div>
      </div>
      <div className=" flex justify-center  flex-row space-x-4 items-center w-full md:w-auto flex-wrap pt-2">
        {props.children}
        {onClose && (
          <div
            className="hidden md:block"
            onClick={(e) => {
              if (onClose) {
                onClose(e);
              }
            }}
          >
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
        "ua-filters-panel  flex items-center  flex-wrap flex-row " +
        (className ? className : "")
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
  ModalActionsPanel,
};
