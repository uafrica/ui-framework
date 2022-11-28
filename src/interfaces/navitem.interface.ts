import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface INavItem {
  displayCondition?: boolean;
  displayName: string;
  hasAccess?: boolean;
  path: string;
  icon: IconProp;
}
