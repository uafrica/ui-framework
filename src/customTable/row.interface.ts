export interface IRow {
  index: number;
  original: any;
  updateRow: (value: any) => void;
  removeRow?: () => void;
}
