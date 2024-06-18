// @ts-ignore
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IPageHeading } from "./interfaces/pageHeading.interface";

function PageHeading(props: IPageHeading) {
  const { id, children, isCenter, icon, shouldNotUppercase } = props;
  const uppercaseText = shouldNotUppercase ? "" : "uppercase";

  return (
    <div
      className={isCenter ? " mx-auto text-center items-center " : ""}
      id={id}
    >
      <h1 className={`text-xl font-bold text-gray-900 ${uppercaseText}`}>
        {icon && <FontAwesomeIcon icon={icon} className="mr-3" size="sm" />}
        {children}
      </h1>
    </div>
  );
}

export { PageHeading };
