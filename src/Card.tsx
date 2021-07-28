interface IProps {
  children: any;
  className?: string;
  width?: string;
  mediumWidth?: string;
}

function Card(props: IProps) {
  let { mediumWidth, width, children } = props;
  let className = props.className ? props.className : "";

  return (
    <div
      className={
        "xs:shadow-lg rounded-md bg-white mt-3 mb-2 border-gray-100 border " +
        (width ? " mx-2 inline-block p-2 xs:p-6 " : " p-4 xs:p-6 block ") +
        className +
        (mediumWidth ? "w-full sm:w-" + mediumWidth : "")
      }
      style={{ width: width }}
    >
      {children}
    </div>
  );
}

export { Card };
