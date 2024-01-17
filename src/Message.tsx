 // @ts-ignore
    import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

// Interfaces
interface IMessageProps {
  heading?: string;
  children: any;
  noPadding?: boolean;
  showShadow?: boolean;
  showCloseButton?: boolean;
}

interface IInstructionProps {
  isCenter?: boolean;
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
        (props.noPadding ? "" : " py-3 ") +
        (props.isCenter ? " text-center " : "") +
        className
      }
    >
      {props.children}
    </p>
  );
}

function BaseMessage(props: IBaseMessageProps) {
  let { children, variant, noPadding, showShadow, showCloseButton } = props;
  const [show, setShow] = useState<boolean>(true);

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
    color = "primary";
  }

  return (
    <>
      {show && (
        <div
          className={
            "rounded-md border border-" +
            color +
            "-200 bg-" +
            color +
            "-50 " +
            (noPadding ? "" : " p-4 my-4 ") +
            (showShadow ? " shadow-lg " : "")
          }
        >
          <div className={"flex justify-between items-center"}>
            <div className=" flex items-center ">
              {icon && (
                <FontAwesomeIcon
                  className={"mr-3 h-5 w-5 text-" + color + "-400"}
                  aria-hidden="true"
                  icon={icon}
                />
              )}
              <div>
                <div className={"text-" + color + "-700"}>{children}</div>
              </div>
            </div>
            {showCloseButton && (
              <FontAwesomeIcon
                icon={"times"}
                className={"text-" + color + "-400 cursor-pointer"}
                onClick={() => setShow(!show)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

const Message = {
  Success,
  Warning,
  Error,
  Info,
  Instruction,
};

export { Message };
