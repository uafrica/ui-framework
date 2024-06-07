export interface IPagination {
  handler: (pageNumber: number) => void;
  active: number;
  pages: number;
  setActive: (pageNumber: number) => void;
  isLoading?: boolean;
  setRows?: (value: any) => void;
  rows?: number;
  scrollRef?: any;
}
