import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import React, { useEffect, useState } from "react";
import "./AdvancedFilter.scss";
import * as generalUtils from "./../utils/generalUtils";
import * as dateUtils from "./../utils/dateUtils";
import moment from "moment";
import { DatePicker } from "../datePicker/DatePicker";
import { SearchInput } from "../SearchInput";
import { Select } from "../Select";
import { DateRange } from "../DateRange";
import Switch from "../Switch";
import { Button } from "../Button";
import { IFilter } from "../interfaces/advancedFilter/filter.interface";
import { IFilterSection } from "../interfaces/advancedFilter/filterSection.interface";
import { ISearchInputFilterComponent } from "../interfaces/advancedFilter/searchInputFilterComponent";
import { ISelectFilterComponent } from "../interfaces/advancedFilter/selectFilterComponent.interface";
import { IDateRangeFilterComponent } from "../interfaces/advancedFilter/dateRangeFilterComponent";
import { IDateFilterComponent } from "../interfaces/advancedFilter/dateFilterComponent.interface";
import { ICustomFilterComponent } from "../interfaces/advancedFilter/customFilterComponent";
import { IAdvancedFilter } from "../interfaces/advancedFilter/advancedFilter.interface";

function AdvancedFilter(props: IAdvancedFilter) {
  let {
    id,
    advancedFilterSections,
    filterSection,
    defaultFilters,
    shouldShowShareButton,
    containerClassName,
    filters,
  } = props;
  const localStorageShouldKeepExpanded = localStorage.getItem(`${id}-expanded`);
  const [hasBeenInitialised, setHasBeenInitialised] = useState<boolean>(false);
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

  useEffect(() => {
    let initFilters = { ...defaultFilters };
    const localStorageFilter = localStorage.getItem(`${id}-filter`);
    const urlFilters = readURL();
    let allFilterProps = getNormalFilterProps().concat(
      getAdvancedFilterProps()
    );
    if (
      urlFilters &&
      Object.keys(urlFilters).filter((key) => {
        return allFilterProps.indexOf(key) > -1;
      }).length > 0
    ) {
      initFilters = urlFilters;
      clearFiltersFromURL();
    } else if (localStorageFilter) {
      initFilters = JSON.parse(localStorageFilter);
    }

    setFiltersInternal(initFilters);
    applyFilters(initFilters, shouldKeepFiltersExpanded);
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

  useEffect(() => {
    if (hasBeenInitialised) {
      setFilters(filters, true);
    }
  }, [filters]);

  useEffect(() => {
    if (filtersInternal) {
      checkFilterChangedCount(filtersInternal);
    }
  }, [filtersInternal]);

  function getNormalFilterProps() {
    let normalProps: string[] = [];

    filterSection?.filterComponents.forEach((filterComponent) => {
      if (filterComponent.type === "custom") {
        normalProps = normalProps.concat(filterComponent.filterProperties);
      }
      if (filterComponent.type === "dateRange") {
        normalProps.push(filterComponent.fromFilterProperty);
        normalProps.push(filterComponent.toFilterProperty);
        normalProps.push(filterComponent.periodFilterProperty);
      } else if (filterComponent.type !== "custom") {
        normalProps.push(filterComponent.filterProperty);
      }
    });

    return normalProps;
  }

  function getAdvancedFilterProps() {
    let advancedProps: string[] = [];

    advancedFilterSections?.forEach((advancedFilterSection) => {
      advancedFilterSection.filterComponents.forEach((filterComponent) => {
        if (filterComponent.type === "custom") {
          advancedProps = advancedProps.concat(
            filterComponent.filterProperties
          );
        } else {
          advancedProps.push(filterComponent.filterProperty);
        }
      });
    });

    return advancedProps;
  }

  function setFilters(filters: IFilter, shouldApplyFilter?: boolean) {
    if (!generalUtils.checkIfObjectsAreEqual(filters, filtersInternal)) {
      setFiltersInternal({ ...filters });

      if (shouldApplyFilter === false) {
        setDidSomethingChange(true);
      } else {
        applyFilters({ ...filters }, true);
      }
    }
  }

  function onFiltersChanged(property: string, value: any) {
    if (filtersInternal && hasBeenInitialised) {
      if (value !== null && value !== undefined) {
        filtersInternal[property] = value;
      } else {
        delete filtersInternal[property];
      }
      setDidSomethingChange(true);
      setFiltersInternal({ ...filtersInternal });
      if (getNormalFilterProps().indexOf(property) > -1) {
        applyFilters(filtersInternal, true);
      }
    }
  }

  function applyFilters(
    filtersInternal: IFilter,
    shouldKeepFiltersExpanded: boolean
  ) {
    updateParentFilters({ ...filtersInternal });
    setDidSomethingChange(false);
    if (!shouldKeepFiltersExpanded) {
      setIsExpanded(false);
    }
    localStorage.setItem(`${id}-filter`, JSON.stringify(filtersInternal));
    setHasBeenInitialised(true);
  }

  function updateParentFilters(filtersInternal: IFilter) {
    if (!generalUtils.checkIfObjectsAreEqual(filters, filtersInternal)) {
      props.onFiltersChanged({ ...filtersInternal });
    }
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
      if (
        !generalUtils.checkIfObjectsAreEqual(filters[key], defaultFilters[key])
      ) {
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
        className="flex flex-row justify-between items-start md:items-center"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 items-center">
          <div className="flex flex-row space-x-4 items-center">
            <FontAwesomeIcon icon="filter" />
            <div className="font-bold ">Advanced filters</div>
          </div>

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
          <div className="flex flex-row space-x-4 text-primary items-center cursor-pointer mt-1 md:mt-0">
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
      <div>
        <div
          className={`advanced-filter-content ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          {renderAdvancedFilterSections()}
        </div>
        {isExpanded && renderFooter()}
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
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 "
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
        filterComponent.shouldShow !== false && (
          <div key={"component" + index} className="mx-1">
            {renderFilterComponent(filterComponent)}
          </div>
        )
      );
    });
  }

  function renderFilterComponent(
    filterComponent:
      | ISearchInputFilterComponent
      | ISelectFilterComponent
      | IDateRangeFilterComponent
      | IDateFilterComponent
      | ICustomFilterComponent
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
        let value =
          filtersInternal[filterComponent.filterProperty] ??
          (filterComponent.selectProps?.isMultiSelection ? [] : null);
        if (filterComponent.valueModifier) {
          value = filterComponent.valueModifier(value);
        }
        return (
          <Select
            buttonWidth={
              getAdvancedFilterProps().includes(filterComponent.filterProperty)
                ? "w-full"
                : "w-full md:w-56"
            }
            value={value}
            label={filterComponent?.label}
            options={filterComponent?.options ?? []}
            allowDeselect
            onChange={(value) => {
              if (filterComponent.onChangeModifier) {
                onFiltersChanged(
                  filterComponent.filterProperty,
                  filterComponent.onChangeModifier(value)
                );
              } else {
                onFiltersChanged(filterComponent.filterProperty, value);
              }
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
            containerClassName="w-full flex flex-col md:flex-row md:space-x-4"
            buttonWidth="w-full md:w-56"
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
            {filterComponent.component(filtersInternal, (filters) => {
              setFilters({ ...filters }, false);
            })}
          </div>
        );
      }
    }
  }

  function renderFooter() {
    return (
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between mt-8">
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
          className="whitespace-nowrap"
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
      filtersInternal && (
        <div>
          {filterSection && (
            <div className="flex flex-col md:flex-row md:flex-wrap md:space-x-4">
              {renderFilterSection(filterSection)}
            </div>
          )}
          {advancedFilterSections && (
            <div
              className={
                containerClassName ??
                "border border-gray-200 rounded-md p-4 bg-white my-4"
              }
            >
              {renderHeading()}
              {renderCollapsableContent()}
            </div>
          )}
        </div>
      )
    );
  }
  return render();
}

export { AdvancedFilter };
