import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Interfaces
interface IMessageProps {
  heading?: string;
  children: any;
  noPadding?: boolean;
  shadow?: boolean;
}

interface IInstructionProps {
  center?: boolean;
  className?: string;
  noPadding?: boolean;
  children: any;
}

interface IBaseMessageProps extends IMessageProps {
  variant: string;
}

// Implementation
function Success(props: IMessageProps) {
  return <BaseMessage {...props} variant="success" />;
}

function Error(props: IMessageProps) {
  return <BaseMessage {...props} variant="error" />;
}

function Warning(props: IMessageProps) {
  return <BaseMessage {...props} variant="warning" />;
}

function Info(props: IMessageProps) {
  return <BaseMessage {...props} variant="info" />;
}

function Instruction(props: IInstructionProps) {
  let className = props.className ? props.className : "";

  return (
    <p
      className={
        (props.noPadding ? "" : " py-3 ") + (props.center ? " text-center " : "") + className
      }
    >
      {props.children}
    </p>
  );
}

function BaseMessage(props: IBaseMessageProps) {
  let { children, variant, noPadding, shadow } = props;

  let color = "gray";
  let icon: IconProp | undefined;

  if (variant === "success") {
    color = "green";
    icon = "check-circle";
  } else if (variant === "error") {
    color = "red";
    icon = "times-circle";
  } else if (variant === "warning") {
    color = "yellow";
    icon = "exclamation-circle";
  } else if (variant === "info") {
    color = "blue";
  }

  return (
    <div
      className={
        "rounded-md border border-" +
        color +
        "-200 bg-" +
        color +
        "-50 " +
        (noPadding ? "" : " p-4 my-4 ") +
        (shadow ? " shadow-lg " : "")
      }
    >
      <div className="flex items-center">
        {icon && (
          <FontAwesomeIcon
            className={"mr-3 h-5 w-5 text-" + color + "-400"}
            aria-hidden="true"
            icon={icon}
          />
        )}
        <div>
          <div className={"text-" + color + "-700"}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Message = {
  Success,
  Warning,
  Error,
  Info,
  Instruction
};

export { Message };
