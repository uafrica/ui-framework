// @ts-ignore
import React from "react";

interface IUnorderedListProps {
  children: React.ReactNode;
  className?: string;
}

function UnorderedList(props: IUnorderedListProps) {
  const { children, className = "mx-6" } = props;

  return <ul className={`list-disc ${className}`}>{children}</ul>;
}

export { UnorderedList };
