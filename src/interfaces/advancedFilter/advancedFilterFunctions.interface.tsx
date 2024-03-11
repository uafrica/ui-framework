import { IFilter } from "./filter.interface";

export interface IAdvancedFilterFunctions {
  resetFilters: () => void; // Reset filter value to default
  setFilters: (filters: IFilter, shouldApplyFilter?: boolean) => void; // Override existing filters value
}
