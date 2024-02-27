export interface IDateRangeFilterComponent {
    type: "dateRange";
    label?: string;
    fromFilterProperty: string;
    toFilterProperty: string;
    periodFilterProperty: string;
    periodOptions: { label: string; value: string }[];
    dateFormat?: string;
    shouldShowTimeSelect?: boolean;
    shouldShow?: boolean;
  }