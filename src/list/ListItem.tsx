// @ts-ignore
import React from "react";
interface IListItemProps {
  children: React.ReactNode;
  className?: string;
}

function ListItem(props: IListItemProps) {
  const { children, className = "my-2" } = props;

  return <li className={`${className}`}>{children}</li>;
}

export { ListItem };
