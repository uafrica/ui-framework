import { useState, useEffect, Dispatch, SetStateAction } from "react";

type IFilter = {
  [key: string]: any;
};
type IUseFilterWithURLParams = [IFilter, Dispatch<SetStateAction<IFilter>>];

function useFilterWithURLParams(
  defaultFilters: IFilter = {}
): IUseFilterWithURLParams {
  const [filters, setFilters] = useState<any>(getInitialFilters);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (!filters[key] || filters[key].length === 0) {
          urlSearchParams.delete(key);
        } else if (typeof filters[key] === "string") {
          urlSearchParams.set(key, filters[key]);
        } else {
          urlSearchParams.set(key, JSON.stringify(filters[key]));
        }
      }
    }

    // Replace the current URL without triggering a page reload
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }, [filters]);

  useEffect(() => {
    // Listen for popstate to update filters when the back/forward buttons are used
    function handlePopstate() {
      setFilters(getInitialFilters());
    }

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  function getInitialFilters() {
    const urlSearchParams: any = new URLSearchParams(window.location.search);
    const urlFilters: IFilter = {};

    for (const [key, value] of urlSearchParams.entries()) {
      try {
        urlFilters[key] = JSON.parse(value);
      } catch (e) {
        urlFilters[key] = value;
      }
    }

    return { ...defaultFilters, ...urlFilters };
  }

  return [filters, setFilters];
}

export { useFilterWithURLParams };
