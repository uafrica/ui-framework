 // @ts-ignore
    import React from "react";
import { Button } from "./Button";

// Interface
interface ISavePanel {
  hasSomethingChanged: boolean;
  saveError?: any;
  isSavingChanges: boolean;
  isSaved?: boolean;
  saveDisabledText?: string;
  saveText?: string;
  cancelText?: string;
  className?: string;
  cancelChanges?: any;
  saveChanges: any;
  callToActionAtBottom?: boolean;
}

interface ISavePanelContainer {
  children: any;
  inModal?: boolean;
}

function SavePanel(props: ISavePanel) {
  const {
    hasSomethingChanged,
    saveError,
    isSavingChanges,
    isSaved,
    saveDisabledText,
    saveText,
    cancelText,
    className,
  } = props;

  return (
    <div
      className={
        "save-panel z-20 py-4 px-4 shadow-inner fixed bottom-0 bg-white justify-between  flex items-center  " +
        (className ? className : "")
      }
    >
      <div
        className={
          `flex ${
            props.callToActionAtBottom ? "flex-col" : "flex-col-reverse "
          } sm:flex-row my-1 w-full ` +
          (!(!isSavingChanges && props.cancelChanges)
            ? "justify-end"
            : "justify-between")
        }
      >
        {!isSavingChanges && props.cancelChanges && (
          <div className="ml-2 mr-2 sm:mr-0 mt-4 sm:mt-0">
            <Button.Cancel
              id="cancel_button"
              title={cancelText ? cancelText : "Cancel"}
              onClick={props.cancelChanges}
              className="w-full"
            />
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mr-2 ml-2 sm:ml-0 justify-end mt-4 sm:mt-0 space-y-4 sm:space-y-0">
          {saveError && (
            <div className="inline-error flex flex-wrap self-center text-center">
              {saveError}
            </div>
          )}
          <Button.Primary
            className="sm:w-auto w-full"
            id="save_button"
            onClick={props.saveChanges}
            isDisabled={
              isSavingChanges ||
              !hasSomethingChanged ||
              Boolean(saveDisabledText)
            }
            hoverTitle={saveDisabledText}
            isLoading={isSavingChanges}
            title={
              isSaved && !hasSomethingChanged
                ? "Saved"
                : saveText
                ? saveText
                : "Save"
            }
            icon={isSaved && !hasSomethingChanged ? "check" : undefined}
            loadingTitle="Saving"
          />
        </div>
      </div>
    </div>
  );
}

function SavePanelContainer(props: ISavePanelContainer) {
  return <div className={props.inModal ? "" : "mb-20"}>{props.children}</div>;
}

export { SavePanel, SavePanelContainer };
