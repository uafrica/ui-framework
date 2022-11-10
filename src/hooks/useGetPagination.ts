import { useState } from "react";

// Returns the pages available in the data set
// The get pagination component should be fired whenever the pages should be calculated.

function useGetPagination() {
  const [pages, setPages] = useState<number>(0);

  function getPagination(dataCount: any, rows: number) {
    let value = dataCount / rows;
    let paginatedVal = Math.ceil(value);
    setPages(paginatedVal);
  }
  return { pages, getPagination };
}

export { useGetPagination };
