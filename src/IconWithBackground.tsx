import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Interface
interface IIconWithBackground {
  icon: IconProp;
  color: string;
}

function IconWithBackground(props: IIconWithBackground) {
  let { icon, color } = props;

  return (
    <div
      className={
        "rounded-full u-center h-8 w-8 bg-" +
        (color ? color : "black") +
        "-100"
      }
    >
      <FontAwesomeIcon
        size="sm"
        icon={icon}
        className={"text-" + (color ? color : "black") + "-500"}
      />
    </div>
  );
}

export { IconWithBackground };
