import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISectionHeading {
  children: any;
  icon?: IconProp;
  iconColor?: string;
  toggleEditMode?: any;
  hideEditMode?: boolean;
  center?: boolean;
}

function SectionHeading(props: ISectionHeading) {
  let { children, icon, iconColor, toggleEditMode, hideEditMode, center } = props;

  return (
    <div
      className={"flex flex-row space-x-4 mb-4 items-center " + (center ? "justify-center" : "")}
    >
      {icon && (
        <div
          className={
            "rounded-full items-center flex justify-center h-8 w-8 bg-" +
            (iconColor ? iconColor : "black") +
            "-100"
          }
        >
          <FontAwesomeIcon
            size="sm"
            icon={icon}
            className={"text-" + (iconColor ? iconColor : "black") + "-500"}
          />
        </div>
      )}

      <h2 className="text-lg font-bold text-gray-900 mt-1 flex items-center">{children}</h2>
      {toggleEditMode && !hideEditMode && (
        <FontAwesomeIcon icon="pencil-alt" className="mt-2" onClick={() => toggleEditMode()} />
      )}
    </div>
  );
}

export { SectionHeading };
