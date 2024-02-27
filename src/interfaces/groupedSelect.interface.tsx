import { ISelectBase } from "./selectBase.interface";
import { ISelectOptionGroup } from "./selectOptionGroup.interface";

export interface IGroupedSelect extends ISelectBase {
  optionGroups: ISelectOptionGroup[];
}
