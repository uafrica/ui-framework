import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface IProps {
  backgroundColorClass: string;
  textColorClass?: string;
  icon?: string;
  children: any;
  iconClassName?: any;
}

function Banner(props: IProps) {
  let { backgroundColorClass, textColorClass, icon, children, iconClassName } = props;

  let elements = document.getElementsByClassName("uafrica-banner");
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
        // element has overflow and is truncated
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
      className={`${backgroundColorClass} p-4 flex justify-between items-center ${textColorClass} font-bold sticky top-0 z-20 -mt-6 mb-4 -mx-4`}
    >
      {typeof children === "string" ? (
        <div className="flex items-center">
          {icon && (
            <FontAwesomeIcon
              // @ts-ignore
              icon={icon}
              className={iconClassName ?? ""}
            />
          )}

          <div
            className={
              "link-container flex " + (showMore ? "flex-row space-x-4" : "flex-col space-y-4")
            }
          >
            {
              <>
                <div
                  id={bannerId}
                  dangerouslySetInnerHTML={{ __html: children }}
                  className={"uafrica-banner " + (showMore ? "line-clamp-1" : "")}
                />
                {renderShowMore()}
              </>
            }
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export { Banner };
