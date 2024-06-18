import { MouseEventHandler, ReactNode } from "react";

export interface ISavePanel {
  hasSomethingChanged: boolean;
  saveError?: any;
  isSavingChanges: boolean;
  isSaved?: boolean;
  saveDisabledText?: string;
  saveText?: string;
  cancelText?: string;
  className?: string;
  cancelChanges?: MouseEventHandler;
  saveChanges?: MouseEventHandler;
  callToActionAtBottom?: boolean;
}

export interface ISavePanelContainer {
  children: ReactNode;
  inModal?: boolean;
}
