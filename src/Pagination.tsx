import { useState, useEffect } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Select } from "./Select";

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
  active,
  pages,
  setActive,
  isLoading,
  setRows,
  rows,
  scrollRef
}: IProps) {
  const [pageVal, setPageVal] = useState<number>(active);

  useEffect(() => {
    setPageVal(active);
  }, [active]);

  useEffect(() => {
    // checkPage
    const newUrlParams = new URLSearchParams(window.location.search);
    const page = newUrlParams.get("page");
    if (page) {
      setActive(parseInt(page));
      setPageVal(parseInt(page));
    }
  }, []);

  return (
    <Card className={`${isLoading && "mt-20"}`}>
      <div className={`flex justify-between items-center`}>
        <div>
          <Button.Link
            id="pagination__go_to_previous_page"
            title="Previous"
            disabled={active === 1}
            onClick={() => {
              setPageVal(pageVal - 1);
              handler(active - 1);
              scrollRef?.current?.scrollIntoView();
            }}
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
                onBlur={() => {
                  setActive(pageVal);
                  handler(pageVal);
                  scrollRef?.current?.scrollIntoView();
                }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" && active !== pageVal) {
                    setActive(pageVal);
                    handler(pageVal);
                    scrollRef?.current?.scrollIntoView();
                  }
                }}
                min={1}
                max={pages}
              />
            </div>
            of
            <span className="total-pages" id="total-pages">
              {pages}
            </span>{" "}
          </div>
          {setRows && rows && (
            <div>
              <Select
                options={["5", "10", "20", "25", "50", "100"].map((item: any) => ({
                  label: item,
                  value: parseInt(item)
                }))}
                value={rows}
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
            onClick={() => {
              setPageVal(pageVal + 1);
              handler(active + 1);
              scrollRef?.current?.scrollIntoView();
            }}
            disabled={active === pages}
          />
        </div>
      </div>
    </Card>
  );
}

export { Pagination };
