export interface IDateFilterComponent {
  type: "date";
  label?: string;
  filterProperty: string;
  dateFormat?: string;
  shouldShow?: boolean;
}
