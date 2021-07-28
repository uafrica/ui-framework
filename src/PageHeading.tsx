interface IPageHeading {
  children: any;
  id?: string;
  center?: boolean;
}

function PageHeading(props: IPageHeading) {
  let { id, children, center } = props;
  return (
    <div className={center ? " mx-auto text-center items-center " : ""} id={id}>
      <h1 className="text-xl font-bold text-gray-900 uppercase">{children}</h1>
    </div>
  );
}

export { PageHeading };
