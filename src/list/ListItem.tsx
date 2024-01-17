 // @ts-ignore
    import React from "react";
interface IListItemProps {
  children: React.ReactNode;
  className?: string;
}

function ListItem(props: IListItemProps) {
  const { children, className } = props;

  const defaultClassName = "my-2";

  return (
    <li className={`${className ? className : defaultClassName}`}>
      {children}
    </li>
  );
}

export { ListItem };
