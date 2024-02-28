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
  setFilterFunctions?: (functions: {
    resetFilters: () => void; // Reset filter value to default
    setFilters: (filters: IFilter, shouldApplyFilter?: boolean) => void; // Override existing filters value
  }) => void;
  shouldShowShareButton?: boolean;
  containerClassName?: string;
}
