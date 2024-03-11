import { IAdvancedFilterFunctions } from "./advancedFilterFunctions.interface";
import { IAdvancedFilterSection } from "./advancedFilterSection.interface";
import { IFilter } from "./filter.interface";
import { IFilterSection } from "./filterSection.interface";

export interface IAdvancedFilter {
  id: string;
  defaultFilters: IFilter;
  filters: IFilter;
  onFiltersChanged: (changedFilters: IFilter) => void;
  advancedFilterSections?: IAdvancedFilterSection[];
  filterSection?: IFilterSection;
  setFilterFunctions?: (functions: IAdvancedFilterFunctions) => void;
  containerClassName?: string;
  store?: any;
}
