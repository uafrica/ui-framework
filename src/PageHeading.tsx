import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPageHeading {
  children: any;
  id?: string;
  icon?: IconProp;
  center?: boolean;
  uppercase?: boolean;
}

function PageHeading(props: IPageHeading) {
  let { id, children, center, icon, uppercase } = props;
  let uppercaseText = "uppercase"

  if (!uppercase) {
    uppercaseText = ""
  }

  return (
    <div className={center ? " mx-auto text-center items-center " : ""} id={id}>
      <h1 className={`text-xl font-bold text-gray-900 ${uppercaseText}`}>
        {icon && <FontAwesomeIcon icon={icon} className={"mr-3"} size="sm" />}
        {children}
      </h1>
    </div>
  );
}

PageHeading.defaultProps = {
  uppercase: true
}

export { PageHeading };
