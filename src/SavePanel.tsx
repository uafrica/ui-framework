import { Button } from "./Button";

// Interface
interface ISavePanel {
  somethingChanged: boolean;
  saveError?: any;
  savingChanges: boolean;
  saved?: boolean;
  saveDisabledText?: string;
  saveText?: string;
  className?: string;
  cancelChanges?: any;
  saveChanges: any;
}

interface ISavePanelContainer {
  children: any;
  inModal?: boolean;
}

function SavePanel(props: ISavePanel) {
  const {
    somethingChanged,
    saveError,
    savingChanges,
    saved,
    saveDisabledText,
    saveText,
    className
  } = props;

  return (
    <div
      className={
        "save-panel z-20 py-4 px-4 shadow-inner fixed bottom-0 bg-white justify-between flex items-center " +
        (className ? className : "")
      }
    >
      {!savingChanges && props.cancelChanges && (
        <div className="ml-2">
          <Button.Cancel id="cancel_button" title="Cancel" onClick={props.cancelChanges} />
        </div>
      )}
      <div className="flex flex-row space-x-4 flex-grow-0 ml-auto mr-2  items-center justify-center ">
        {saveError && <div className="inline-error mr-2 mt-2 ">{saveError}</div>}

        <Button.Primary
          className="sm:w-auto w-full"
          id="save_button"
          onClick={props.saveChanges}
          disabled={savingChanges || !somethingChanged || Boolean(saveDisabledText)}
          hoverTitle={saveDisabledText}
          isLoading={savingChanges}
          title={saved && !somethingChanged ? "Saved" : saveText ? saveText : "Save"}
          icon={saved && !somethingChanged ? "check" : undefined}
          loadingTitle="Saving"
        />
      </div>
    </div>
  );
}

function SavePanelContainer(props: ISavePanelContainer) {
  return <div className={props.inModal ? "" : "mb-20"}>{props.children}</div>;
}

export { SavePanel, SavePanelContainer };
