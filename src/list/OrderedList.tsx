 // @ts-ignore
    import React from "react";

interface IOrderedListProps {
  children: React.ReactNode;
  className?: string;
}

function OrderedList(props: IOrderedListProps) {
  const { children, className } = props;
  const defaultClassName = "mx-6";

  return (
    <ol className={`list-decimal ${className ? className : defaultClassName}`}>
      {children}
    </ol>
  );
}

export { OrderedList };
