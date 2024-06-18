// @ts-ignore
import React from "react";

interface IOrderedListProps {
  children: React.ReactNode;
  className?: string;
}

function OrderedList(props: IOrderedListProps) {
  const { children, className = "mx-6" } = props;

  return <ol className={`list-decimal ${className}`}>{children}</ol>;
}

export { OrderedList };
