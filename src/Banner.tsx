// @ts-ignore
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBanner } from "./interfaces/banner.interface";

function Banner(props: IBanner) {
  const {
    backgroundColorClass = "",
    textColorClass = "",
    icon,
    children,
    iconClassName = "",
  } = props;

  const elements = document.getElementsByClassName("uafrica-banner");
  const [bannerId] = useState(`banner_${elements.length}`);
  const [isMultiline, setIsMultiline] = useState<boolean>(false);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    setIsMultiline(false);
    setShowMore(true);

    var element = document.getElementById(bannerId);
    if (element) {
      if (
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth
      ) {
        // Element has overflow and is truncated
        if (isMultiline === false) {
          setIsMultiline(true);
        }
      }
    }
  }, [children]);

  function renderShowMore() {
    return (
      isMultiline && (
        <div
          className={`whitespace-nowrap cursor-pointer font-normal italic`}
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          Show {showMore ? "more" : "less"}
        </div>
      )
    );
  }

  return (
    <div
      className={`${backgroundColorClass} p-4 flex justify-between items-center ${textColorClass} font-bold md:sticky top-0 z-20 -mt-6 mb-4 -mx-4`}
    >
      {typeof children === "string" ? (
        <div className="flex flex-row justify-between space-x-4 items-center w-full">
          <div className="flex items-center ">
            {icon && (
              <FontAwesomeIcon
                // @ts-ignore
                icon={icon}
                className={iconClassName ?? ""}
              />
            )}

            <div
              className={
                "link-container flex " +
                (showMore ? "flex-row space-x-4" : "flex-col space-y-4")
              }
            >
              <>
                <div
                  id={bannerId}
                  dangerouslySetInnerHTML={{ __html: children }}
                  className={
                    "uafrica-banner " + (showMore ? "line-clamp-1" : "")
                  }
                />
              </>
            </div>
          </div>
          {renderShowMore()}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export { Banner };
