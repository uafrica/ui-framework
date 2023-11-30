
interface IListItemProps {
  value: string | number;
  className?: string;
}

function ListItem( props: IListItemProps){
  const {value, className} = props

  const defaultClassName = "my-2"

  return (
    <li className={`${className ? className : defaultClassName}`}>{value}</li>
  );
}

export {ListItem};