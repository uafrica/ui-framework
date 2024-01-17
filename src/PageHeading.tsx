 // @ts-ignore
    import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IPageHeading {
  children: any;
  id?: string;
  icon?: IconProp;
  isCenter?: boolean;
  shouldNotUppercase?: boolean;
}

function PageHeading(props: IPageHeading) {
  let { id, children, isCenter, icon, shouldNotUppercase } = props;
  let uppercaseText = "uppercase";

  if (shouldNotUppercase) {
    uppercaseText = "";
  }

  return (
    <div
      className={isCenter ? " mx-auto text-center items-center " : ""}
      id={id}
    >
      <h1 className={`text-xl font-bold text-gray-900 ${uppercaseText}`}>
        {icon && <FontAwesomeIcon icon={icon} className={"mr-3"} size="sm" />}
        {children}
      </h1>
    </div>
  );
}

export { PageHeading };
