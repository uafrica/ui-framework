// @ts-ignore
import React, { ReactNode } from "react";
// Interface
interface IResponsiveRow {
  children: ReactNode;
  isCenteredVertically?: boolean;
}

function ResponsiveRow(props: IResponsiveRow) {
  const { children, isCenteredVertically } = props;

  return (
    <div
      className={`flex sm:space-x-4 flex-wrap sm:flex-nowrap 
        ${isCenteredVertically ? "items-center" : ""}`}
    >
      {children}
    </div>
  );
}

export default ResponsiveRow;
