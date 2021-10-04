import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPageHeading {
  children: any;
  id?: string;
  icon?: IconProp;
  center?: boolean;
}

function PageHeading(props: IPageHeading) {
  let { id, children, center, icon } = props;
  return (
    <div className={center ? " mx-auto text-center items-center " : ""} id={id}>
      <h1 className="text-xl font-bold text-gray-900 uppercase">
        {icon && <FontAwesomeIcon icon={icon} className={"mr-3"} size="4x" />}
        {children}
      </h1>
    </div>
  );
}

export { PageHeading };
