import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { MouseEventHandler, ReactNode } from "react";

export interface IPanel {
  children?: ReactNode;
  title?: ReactNode;
  className?: string;
  onClose?: MouseEventHandler | Function;
}

export interface IPageActionsPanelProps {
  children?: ReactNode;
  title?: ReactNode;
  className?: string;
  onClose?: MouseEventHandler;
  icon?: IconProp;
  shouldNotUppercase?: boolean;
}

export interface ISectionActionsPanel {
  children?: ReactNode;
  title?: ReactNode;
  className?: string;
  toggleEditMode?: () => void;
  hideEditMode?: boolean;
  icon?: IconProp;
  iconColor?: string;
}

export interface IFiltersPanel {
  children?: ReactNode;
  className?: string;
}
