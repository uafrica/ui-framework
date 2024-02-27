import { ICustomFilterComponent } from "./customFilterComponent";
import { IDateFilterComponent } from "./dateFilterComponent.interface";
import { ISearchInputFilterComponent } from "./searchInputFilterComponent";
import { ISelectFilterComponent } from "./selectFilterComponent.interface";

export interface IAdvancedFilterSection {
  filterComponents: (
    | ISearchInputFilterComponent
    | ISelectFilterComponent
    | IDateFilterComponent
    | ICustomFilterComponent
  )[];
}
