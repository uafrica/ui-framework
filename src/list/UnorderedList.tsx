
interface IUnorderedListProps {
  children: React.ReactNode;
  className?: string;
}

function UnorderedList(props: IUnorderedListProps) {
  const {children, className} = props

  const defaultClassName = "mx-6"

  return (
    <ul className={`list-disc ${className? className : defaultClassName}`}>
      {children}
    </ul>
  )
}

export {UnorderedList};