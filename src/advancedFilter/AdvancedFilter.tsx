import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./AdvancedFilter.scss";
import { IInputProps } from "../interfaces/inputProps.interface";
import debounce from "lodash/debounce";
import { ISelectBase } from "../interfaces/selectBase.interface";
import * as generalUtils from "./../utils/generalUtils";
import * as dateUtils from "./../utils/dateUtils";
import moment from "moment";
import { DatePicker } from "../datePicker/DatePicker";
import { FiltersPanel } from "../Panels";
import { SectionHeading } from "../SectionHeading";
import { SearchInput } from "../SearchInput";
import { Select } from "../Select";
import { DateRange } from "../DateRange";
import Switch from "../Switch";
import { Button } from "../Button";

interface IFilterSection {
  filterComponents: (
    | ISearchInputFilterComponent
    | ISelectFilterComponent
    | IDateRangeComponent
    | IDateComponent
    | ICustomComponent
  )[];
}

interface IAdvancedFilterSection {
  filterComponents: (
    | ISearchInputFilterComponent
    | ISelectFilterComponent
    | IDateComponent
    | ICustomComponent
  )[];
}

interface ISearchInputFilterComponent {
  type: "search";
  label?: string;
  filterProperty: string;
  inputProps?: IInputProps;
}

interface ISelectFilterComponent {
  type: "select";
  label?: string;
  filterProperty: string;
  options: {
    [key: string]: any;
  }[];
  selectProps?: ISelectBase;
}

interface IDateComponent {
  type: "date";
  label?: string;
  filterProperty: string;
  dateFormat?: string;
}

interface IDateRangeComponent {
  type: "dateRange";
  label?: string;
  fromFilterProperty: string;
  toFilterProperty: string;
  periodFilterProperty: string;
  periodOptions: { label: string; value: string }[];
  dateFormat?: string;
  shouldShowTimeSelect?: boolean;
}

interface ICustomComponent {
  type: "custom";
  filterProperty: string;
  component: (value: any, onChange: (value: any) => void) => ReactNode;
}

interface IFilter {
  [key: string]: any;
}

function AdvancedFilter(props: {
  id: string;
  defaultFilters: IFilter;
  onFiltersChanged: (changedFilters: IFilter) => void;
  advancedFilterSections?: IAdvancedFilterSection[];
  filterSection?: IFilterSection;
  setFilterFunctions?: (functions: {
    resetFilters: () => void; // Reset filter value to default
    setFilters: (filters: IFilter, shouldApplyFilter?: boolean) => void; // Override existing filters value
  }) => void;
  shouldShowShareButton?: boolean;
}) {
  let {
    id,
    advancedFilterSections,
    filterSection,
    defaultFilters,
    shouldShowShareButton,
  } = props;
  const localStorageShouldKeepExpanded = localStorage.getItem(`${id}-expanded`);
  const [filtersInternal, setFiltersInternal] = useState<IFilter>({});
  const [didSomethingChange, setDidSomethingChange] = useState<boolean>(false);
  const [shouldKeepFiltersExpanded, setShouldKeepFiltersExpanded] =
    useState<boolean>(
      localStorageShouldKeepExpanded
        ? JSON.parse(localStorageShouldKeepExpanded)
        : false
    );
  const [isExpanded, setIsExpanded] = useState<boolean>(
    localStorageShouldKeepExpanded
      ? JSON.parse(localStorageShouldKeepExpanded)
      : false
  );
  const [advancedFiltersChangedCount, setAdvancedFiltersChangedCount] =
    useState<number>(0);
  const debouncedApplyFilter = useRef(debounce(applyFilters, 1000));

  useEffect(() => {
    let initFilters = { ...defaultFilters };
    const localStorageFilter = localStorage.getItem(`${id}-filter`);
    const urlFilters = readURL();
    if (urlFilters && Object.keys(urlFilters).length > 0) {
      initFilters = urlFilters;
      clearFiltersFromURL();
    } else if (localStorageFilter) {
      initFilters = JSON.parse(localStorageFilter);
    }

    setFiltersInternal(initFilters);
    debouncedApplyFilter.current(initFilters, shouldKeepFiltersExpanded);
    checkFilterChangedCount(initFilters);
    if (props.setFilterFunctions) {
      props.setFilterFunctions({
        resetFilters: () => {
          setFilters(defaultFilters, true);
        },
        setFilters: (filters, shouldApplyFilter) => {
          setFilters(filters, shouldApplyFilter);
        },
      });
    }
  }, []);

  function getNormalFilterProps() {
    let normalProps: string[] = [];

    filterSection?.filterComponents.forEach((filterComponent) => {
      if (filterComponent.type !== "dateRange") {
        normalProps.push(filterComponent.filterProperty);
      } else if (filterComponent.type === "dateRange") {
        normalProps.push(filterComponent.fromFilterProperty);
        normalProps.push(filterComponent.toFilterProperty);
        normalProps.push(filterComponent.periodFilterProperty);
      }
    });

    return normalProps;
  }

  function getAdvancedFilterProps() {
    let advancedProps: string[] = [];

    advancedFilterSections?.forEach((advancedFilterSection) => {
      advancedFilterSection.filterComponents.forEach((filterComponent) => {
        advancedProps.push(filterComponent.filterProperty);
      });
    });

    return advancedProps;
  }

  function setFilters(filters: IFilter, shouldApplyFilter?: boolean) {
    setFiltersInternal({ ...filters });

    if (shouldApplyFilter === false) {
      setDidSomethingChange(true);
    } else {
      debouncedApplyFilter.current({ ...filters }, true);
    }
  }

  function onFiltersChanged(property: string, value: any) {
    if (value) {
      filtersInternal[property] = value;
    } else {
      delete filtersInternal[property];
    }
    setDidSomethingChange(true);
    setFiltersInternal({ ...filtersInternal });
    if (getNormalFilterProps().indexOf(property) > -1) {
      debouncedApplyFilter.current(filtersInternal, true);
    }
  }

  function applyFilters(
    filtersInternal: IFilter,
    shouldKeepFiltersExpanded: boolean
  ) {
    props.onFiltersChanged({ ...filtersInternal });
    setDidSomethingChange(false);
    if (!shouldKeepFiltersExpanded) {
      setIsExpanded(false);
    }
    localStorage.setItem(`${id}-filter`, JSON.stringify(filtersInternal));
    checkFilterChangedCount(filtersInternal);
  }

  function buildURLToShare() {
    const urlSearchParams = new URLSearchParams();

    for (const key in filtersInternal) {
      if (filtersInternal.hasOwnProperty(key)) {
        if (!filtersInternal[key] || filtersInternal[key].length === 0) {
          urlSearchParams.delete(key);
        } else if (typeof filtersInternal[key] === "string") {
          urlSearchParams.set(key, filtersInternal[key]);
        } else {
          urlSearchParams.set(key, JSON.stringify(filtersInternal[key]));
        }
      }
    }

    const url = `${window.location.pathname}?${urlSearchParams.toString()}`;
    console.log("🚀 ~ URL:", url); // Functionality to be confirmed
  }

  function readURL() {
    const urlSearchParams: any = new URLSearchParams(window.location.search);
    const urlFilters: IFilter = {};

    for (const [key, value] of urlSearchParams.entries()) {
      try {
        urlFilters[key] = JSON.parse(value);
      } catch (e) {
        urlFilters[key] = value;
      }
    }

    return urlFilters;
  }

  function clearFiltersFromURL() {
    var currentUrl = window.location.href;

    var url = new URL(currentUrl);
    var searchParams = url.searchParams;

    getNormalFilterProps().forEach(function (key) {
      searchParams.delete(key);
    });

    getAdvancedFilterProps().forEach(function (key) {
      searchParams.delete(key);
    });

    url.search = searchParams.toString();

    window.history.replaceState({}, document.title, url.toString());
  }

  function checkFilterChangedCount(filters: IFilter) {
    let count = 0;

    const advancedFilterProps = getAdvancedFilterProps();
    advancedFilterProps.forEach((key) => {
      if (!generalUtils.compareValues(filters[key], defaultFilters[key])) {
        count += 1;
      }
    });

    setAdvancedFiltersChangedCount(count);
  }

  /* -------------------------------- */
  /* RENDER METHODS */
  /* -------------------------------- */

  function renderHeading() {
    return (
      <div
        className="flex flex-row justify-between items-center"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex flex-row space-x-4 items-center">
          <FontAwesomeIcon icon="filter" />
          <SectionHeading noMarginBottom>Advanced filters</SectionHeading>
          {advancedFiltersChangedCount > 0 && (
            <div className=" text-gray-500">
              ( {advancedFiltersChangedCount} filter
              {advancedFiltersChangedCount === 1 ? "" : "s"} applied)
            </div>
          )}
        </div>
        <div className="flex flex-row space-x-4 items-center">
          {shouldShowShareButton && (
            <div
              className="flex flex-row space-x-4 text-black items-center cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                buildURLToShare();
              }}
            >
              <div className="font-bold">Share</div>
              <FontAwesomeIcon icon="share-from-square" />
            </div>
          )}
          <div className="flex flex-row space-x-4 text-primary items-center cursor-pointer">
            <div className="font-bold">
              {isExpanded ? "Collapse" : "Expand"}
            </div>
            <FontAwesomeIcon icon={isExpanded ? "caret-up" : "caret-down"} />
          </div>
        </div>
      </div>
    );
  }

  function renderCollapsableContent() {
    return (
      <div
        className={`advanced-filter-content ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        {renderAdvancedFilterSections()}

        {renderFooter()}
      </div>
    );
  }

  function renderAdvancedFilterSections() {
    return (
      advancedFilterSections &&
      advancedFilterSections.map((filterSection, index) => {
        return (
          <div
            key={"section" + index}
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-4"
          >
            {renderFilterSection(filterSection)}
          </div>
        );
      })
    );
  }

  function renderFilterSection(filterSection: IFilterSection) {
    return filterSection.filterComponents.map((filterComponent, index) => {
      return (
        <div key={"component" + index} className="mx-1">
          {renderFilterComponent(filterComponent)}
        </div>
      );
    });
  }

  function renderFilterComponent(
    filterComponent:
      | ISearchInputFilterComponent
      | ISelectFilterComponent
      | IDateRangeComponent
      | IDateComponent
      | ICustomComponent
  ) {
    switch (filterComponent.type) {
      case "search": {
        return (
          <SearchInput
            label={filterComponent?.label}
            value={filtersInternal[filterComponent.filterProperty] ?? ""}
            onChange={(e: any) => {
              onFiltersChanged(filterComponent.filterProperty, e.target.value);
            }}
            {...filterComponent.inputProps}
          />
        );
      }
      case "select": {
        return (
          <Select
            buttonWidth="w-full"
            value={
              filtersInternal[filterComponent.filterProperty] ??
              (filterComponent.selectProps?.isMultiSelection ? [] : null)
            }
            label={filterComponent?.label}
            options={filterComponent?.options ?? []}
            allowDeselect
            onChange={(value) => {
              onFiltersChanged(filterComponent.filterProperty, value);
            }}
            {...filterComponent.selectProps}
          />
        );
      }
      case "date": {
        return (
          <DatePicker
            dateFormat={filterComponent?.dateFormat ?? "yyyy-MM-DD"}
            label={filterComponent?.label}
            selectedDate={filtersInternal[filterComponent.filterProperty]}
            onChange={(date) => {
              onFiltersChanged(filterComponent.filterProperty, date);
            }}
          />
        );
      }
      case "dateRange": {
        return (
          <DateRange
            label={filterComponent?.label}
            containerClassName="w-full flex flex-row space-x-4"
            buttonWidth="w-full md:w-52"
            dateFormat={filterComponent.dateFormat ?? "yyyy-MM-DD"}
            showTimeSelect={filterComponent.shouldShowTimeSelect}
            showRange={
              filtersInternal[filterComponent.periodFilterProperty] ===
              "date_range"
            }
            showMonth={
              filtersInternal[filterComponent.periodFilterProperty] === "month"
            }
            period={filtersInternal[filterComponent.periodFilterProperty]}
            defaultPeriod={defaultFilters[filterComponent.periodFilterProperty]}
            dateFrom={
              filtersInternal[filterComponent.fromFilterProperty] ?? null
            }
            defaultDateFrom={
              defaultFilters[filterComponent.fromFilterProperty] ?? null
            }
            dateTo={filtersInternal[filterComponent.toFilterProperty] ?? null}
            defaultDateTo={
              defaultFilters[filterComponent.toFilterProperty] ?? null
            }
            onPeriodChange={(period: any) => {
              if (
                filtersInternal[filterComponent.periodFilterProperty] !== period
              ) {
                onFiltersChanged(filterComponent.periodFilterProperty, period);
              }
              if (
                filtersInternal[filterComponent.fromFilterProperty] !== null
              ) {
                onFiltersChanged(filterComponent.fromFilterProperty, null);
              }
              if (filtersInternal[filterComponent.toFilterProperty] !== null) {
                onFiltersChanged(filterComponent.toFilterProperty, null);
              }
            }}
            onRangeChange={(from: any, to: any) => {
              let filtersTemp: any = generalUtils.clone(filtersInternal);

              if (
                Date.parse(
                  // @ts-ignore
                  new Date(filtersTemp[filterComponent.fromFilterProperty])
                  // @ts-ignore
                ) !== Date.parse(new Date(from))
              ) {
                onFiltersChanged(
                  filterComponent.fromFilterProperty,
                  dateUtils.pgFormatDate(from)
                );
              }

              if (
                Date.parse(
                  // @ts-ignore
                  new Date(filtersTemp[filterComponent.toFilterProperty])
                  // @ts-ignore
                ) !== Date.parse(new Date(to))
              ) {
                onFiltersChanged(
                  filterComponent.toFilterProperty,
                  dateUtils.pgFormatDate(moment(new Date(to)))
                );
              }
            }}
            onMonthChange={(from: any, to: any) => {
              onFiltersChanged(
                filterComponent.fromFilterProperty,
                dateUtils.pgFormatDate(moment(new Date(from)).startOf("day"))
              );
              onFiltersChanged(
                filterComponent.toFilterProperty,
                dateUtils.pgFormatDate(moment(new Date(to)).endOf("day"))
              );
            }}
            periodOptions={filterComponent.periodOptions}
          />
        );
      }
      default: {
        return (
          <div>
            {filterComponent.component(
              filtersInternal[filterComponent.filterProperty],
              (value) => {
                onFiltersChanged(filterComponent.filterProperty, value);
              }
            )}
          </div>
        );
      }
    }
  }

  function renderFooter() {
    return (
      <div className="flex flex-row justify-between mt-8">
        <Switch
          label="Keep advanced filters expanded"
          isChecked={shouldKeepFiltersExpanded}
          onChange={() => {
            setShouldKeepFiltersExpanded(!shouldKeepFiltersExpanded);
            localStorage.setItem(
              `${id}-expanded`,
              JSON.stringify(!shouldKeepFiltersExpanded)
            );
          }}
        />
        <Button.Primary
          title="Apply filters"
          isDisabled={!didSomethingChange}
          onClick={() => {
            applyFilters(filtersInternal, shouldKeepFiltersExpanded);
          }}
        />
      </div>
    );
  }

  function render() {
    return (
      <div>
        {filterSection && (
          <FiltersPanel>{renderFilterSection(filterSection)}</FiltersPanel>
        )}
        <div className="border border-gray-200 rounded-md p-4 bg-white my-4">
          {renderHeading()}
          {renderCollapsableContent()}
        </div>
      </div>
    );
  }
  return render();
}

export { AdvancedFilter };
