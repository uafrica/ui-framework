import { ICustomFilterComponent } from "./customFilterComponent";
import { IDateFilterComponent } from "./dateFilterComponent.interface";
import { IDateRangeFilterComponent } from "./dateRangeFilterComponent";
import { ISearchInputFilterComponent } from "./searchInputFilterComponent";
import { ISelectFilterComponent } from "./selectFilterComponent.interface";

export interface IFilterSection {
  filterComponents: (
    | ISearchInputFilterComponent
    | ISelectFilterComponent
    | IDateRangeFilterComponent
    | IDateFilterComponent
    | ICustomFilterComponent
  )[];
}
