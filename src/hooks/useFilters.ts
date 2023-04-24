import { useEffect, useState } from "react";
import * as generalUtils from "../utils/generalUtils";
import { useHistory } from "react-router-dom";

type ObjectType = {
  [k: string]: any;
};
interface IUseFilters {
  defaultFilters: ObjectType; // default filters to be added initially
  insertUrl?: boolean; // should the filters be appended to the url
  filtersChangeCallback?: Function; // function that runs after a filter change
  overrideDefaultFilters?: boolean; // should the default filters be overridden by the url filters
  advancedFilterNames?: ObjectType; // advanced filters to be shown
  handleInitialFilters?: (val: string) => void; // saved filters to be shown
}

export function useFilters({
  defaultFilters,
  insertUrl = true,
  filtersChangeCallback,
  overrideDefaultFilters = true,
  advancedFilterNames = {},
  handleInitialFilters
}: IUseFilters) {
  const history = useHistory();
  const [filters, setFilters] = useState(defaultFilters);
  const [advancedFiltersChecked, setAdvancedFiltersChecked] = useState<Array<any>>([]);

  function IsJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return str;
    }
    return JSON.parse(str);
  }

  function objectifyQueryString(queryString: any) {
    let obj: any = {};
    for (let [key, value] of queryString.entries()) {
      obj[key] = value;
    }
    return obj;
  }

  useEffect(() => {
    let initValue = new URLSearchParams(window.location.search);

    let initParams: any = objectifyQueryString(initValue);
    Object.keys(initParams).forEach((el: any) => {
      initParams[el] = IsJsonString(initParams[el]);
    });

    delete initParams.tab;
    let newFilters: any = generalUtils.clone(initParams);

    if (advancedFilterNames) {
      Object.keys(advancedFilterNames).forEach((key: string) => {
        // if the preset contains an advanced filter, show the filter

        let advancedFilterKey = advancedFilterNames[key];
        if (newFilters[advancedFilterKey]) {
          advancedFiltersChecked.push(advancedFilterNames[key]);
        } else if (handleInitialFilters) {
          handleInitialFilters(key); // if the preset contains an advanced filter, show the filter
        }
      });
    }

    if (overrideDefaultFilters) {
      newFilters = newFilters;
    } else {
      newFilters = {
        ...newFilters,
        ...defaultFilters
      };
    }
    setFilters(newFilters);

    if (filtersChangeCallback) {
      filtersChangeCallback(newFilters);
    }
  }, []);

  function insertUrlParam(filters: any) {
    let filtersClone = generalUtils.clone(filters);

    if (filtersClone.tag_id) {
      filtersClone.tag_id = filtersClone.tag_id.map((t: any) => {
        return t.id;
      });
    }

    if (filtersClone.absolute_query === "month") {
      filtersClone.absolute_query = "month";
    } else if (filtersClone.absolute_query !== "date_range") {
      delete filtersClone.start_date;
      delete filtersClone.end_date;
    }

    let value = generalUtils.serialize(generalUtils.addFiltersToArgsCheck(filtersClone, {}));
    history.push({
      pathname: location.pathname,
      search: value.toString()
    });
  }

  const handleFilterChange = (key: string, value: any) => {
    const clonedFilters = generalUtils.clone(filters);

    if (value) {
      clonedFilters[key] = value;
    } else {
      delete clonedFilters[key];
    }

    if (insertUrl) {
      insertUrlParam(clonedFilters);
    }

    setFilters(clonedFilters);
    if (filtersChangeCallback) {
      filtersChangeCallback(clonedFilters);
    }
  };

  return {
    filters,
    setFilters,
    handleFilterChange,
    advancedFiltersChecked,
    setAdvancedFiltersChecked
  };
}
