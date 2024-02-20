// @ts-ignore
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Select } from "./Select";
import * as generalUtils from "./utils/generalUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  handler: Function;
  active: number;
  pages: number;
  setActive: Function;
  isLoading?: boolean;
  setRows?: Function;
  rows?: number;
  scrollRef?: any;
}

function Pagination({
  handler,
  active: activePageNumber,
  pages: totalPageCount,
  setActive,
  isLoading,
  setRows,
  rows: amountOfRows,
  scrollRef,
}: IProps) {
  const [pageVal, setPageVal] = useState<number>(activePageNumber);

  useEffect(() => {
    setPageVal(activePageNumber);
  }, [activePageNumber]);

  useEffect(() => {
    // CheckPage
    const newUrlParams = new URLSearchParams(window.location.search);
    const page = newUrlParams.get("page");
    if (page) {
      setActive(parseInt(page));
      setPageVal(parseInt(page));
    }
  }, []);

  function goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPageCount) {
      setPageVal(pageNumber);
      handler(pageNumber);
      scrollRef?.current?.scrollIntoView();
    }
  }

  function goToNextPage() {
    goToPage(pageVal + 1);
  }

  function goToPreviousPage() {
    goToPage(pageVal - 1);
  }

  function goToFirstPage() {
    goToPage(1);
  }
  function goToLastPage() {
    goToPage(totalPageCount);
  }

  function renderForDesktop() {
    return (
      <div className={`flex justify-between items-center`}>
        <div>
          <Button.Link
            id="pagination__go_to_previous_page"
            title="Previous"
            isDisabled={activePageNumber === 1}
            onClick={goToPreviousPage}
          />
        </div>
        <div className={"flex items-center"}>
          <div>
            <div className="page-info">Page</div>
            <div className="page-jump">
              <input
                className={"-pageJump"}
                id={"-pageJump"}
                value={pageVal}
                type="number"
                onChange={(e: any) => {
                  setPageVal(e.target.value);
                }}
                onBlur={(e: any) => {
                  if (parseInt(e.target.value) === pageVal) {
                    return;
                  }
                  goToPage(pageVal);
                }}
                onKeyDown={(e: any) => {
                  if (parseInt(e.target.value) === pageVal) {
                    return;
                  }
                  if (e.key === "Enter" && activePageNumber !== pageVal) {
                    goToPage(pageVal);
                  }
                }}
                min={1}
                max={totalPageCount}
              />
            </div>
            of
            <span className="total-pages" id="total-pages">
              {totalPageCount}
            </span>{" "}
          </div>
          {setRows && amountOfRows && (
            <div>
              <Select
                options={["5", "10", "20", "25", "50", "100"].map(
                  (item: any) => ({
                    label: item,
                    value: parseInt(item),
                  })
                )}
                value={amountOfRows}
                onChange={(val: any) => setRows(val)}
                buttonWidth={"w-20 -mt-4 ml-8"}
              />
            </div>
          )}
        </div>
        <div>
          <Button.Link
            id="pagination__go_to_next_page"
            title="Next"
            onClick={goToNextPage}
            isDisabled={activePageNumber === totalPageCount}
          />
        </div>
      </div>
    );
  }

  function renderPageNumber(pageNumber: number) {
    return (
      <div
        key={pageNumber}
        className={
          activePageNumber === pageNumber ? "font-bold text-primary" : ""
        }
        onClick={() => {
          goToPage(pageNumber);
        }}
      >
        {pageNumber}
      </div>
    );
  }

  function renderEllipses(key: string) {
    return <div key={key}>...</div>;
  }

  function renderPageNumbers() {
    const pageNumberElements: any[] = [];

    if (totalPageCount <= 3) {
      for (let i = 1; i <= totalPageCount; i++) {
        pageNumberElements.push(renderPageNumber(i));
      }
    } else {
      pageNumberElements.push(renderPageNumber(1));
      if (activePageNumber > 3) {
        pageNumberElements.push(renderEllipses("before"));
      }
      if (activePageNumber > 2) {
        pageNumberElements.push(renderPageNumber(activePageNumber - 1));
      }
      if (activePageNumber > 1 && activePageNumber < totalPageCount) {
        pageNumberElements.push(renderPageNumber(activePageNumber));
      }
      if (activePageNumber < totalPageCount - 1) {
        pageNumberElements.push(renderPageNumber(activePageNumber + 1));
      }
      if (activePageNumber < totalPageCount - 2) {
        pageNumberElements.push(renderEllipses("after"));
      }
      pageNumberElements.push(renderPageNumber(totalPageCount));
    }

    return (
      <div className="flex flex-wrap space-x-4 w-full justify-center items-center">
        {pageNumberElements.map((pageNumberElement) => {
          return pageNumberElement;
        })}
      </div>
    );
  }

  function renderForMobile() {
    return (
      <div className="flex flex-row justify-stretch space-x-4 items-center text-lg">
        <div className="w-6">
          {activePageNumber !== 1 && (
            <FontAwesomeIcon icon="angles-left" onClick={goToFirstPage} />
          )}
        </div>
        <div className="w-6">
          <FontAwesomeIcon
            icon="angle-left"
            onClick={goToPreviousPage}
            className={activePageNumber === 1 ? "text-gray-400" : ""}
          />
        </div>
        {renderPageNumbers()}
        <div className="w-6">
          <FontAwesomeIcon
            icon="angle-right"
            onClick={goToNextPage}
            className={
              activePageNumber === totalPageCount ? "text-gray-400" : ""
            }
          />
        </div>
        <div className="w-6">
          {activePageNumber !== totalPageCount && (
            <FontAwesomeIcon icon="angles-right" onClick={goToLastPage} />
          )}
        </div>
      </div>
    );
  }
  function render() {
    return (
      <Card className={`${isLoading && "mt-20"}`}>
        {generalUtils.isScreenDesktopSize()
          ? renderForDesktop()
          : renderForMobile()}
      </Card>
    );
  }

  return render();
}

export { Pagination };
