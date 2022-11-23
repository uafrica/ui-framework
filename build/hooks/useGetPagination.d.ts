declare function useGetPagination(): {
    pages: number;
    getPagination: (dataCount: any, rows: number) => void;
};
export { useGetPagination };
