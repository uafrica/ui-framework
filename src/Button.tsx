// @ts-ignore
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link as RouterLink } from "react-router-dom";
import {
  IButtonBaseProps,
  IButtonProps,
  IButtonsPanelProps,
  ILinkBaseProps,
  ILinkProps,
} from "./interfaces/button.interface";

// Implementation
function Primary(props: IButtonProps) {
  const bgColor = props.bgColor ? props.bgColor : "primary";
  const bgColorClass = "bg-" + bgColor;
  const bgColorHoverClass = "hover:bg-" + bgColor + "-dark";
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={` focus:outline-none focus:ring-1 focus:ring-primary inline-flex justify-center items-center px-5 py-2 border leading-4 font-medium rounded-full shadow-sm focus: outline-none border-transparent text-white ${bgColorClass} ${bgColorHoverClass} `}
      type="submit"
    />
  );
}

function Secondary(props: IButtonProps) {
  const bgColor = props.bgColor ? props.bgColor : "primary";

  const borderClass = "border-" + bgColor;
  const textClass = "text-" + bgColor;
  const hoverClass = "hover:bg-" + bgColor;
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={` focus:outline-none focus:ring-1 focus:ring-primary inline-flex justify-center items-center px-5 py-2 border leading-4 font-medium rounded-full shadow-sm focus:outline-none ${borderClass} ${textClass} ${hoverClass} bg-white hover:text-white `}
    />
  );
}

function Tertiary(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        " focus:outline-none focus:ring-1 focus:ring-primary inline-flex justify-center items-center px-5 py-2 border leading-4 font-medium rounded-full shadow-sm focus:outline-none border-gray-900 text-gray-99 bg-white hover:text-primary hover:border-primary "
      }
    />
  );
}

function Danger(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        " focus:outline-none focus:ring-1 focus:ring-red inline-flex justify-center items-center px-5 py-2 border leading-4 font-medium rounded-full shadow-sm focus: outline-none border-transparent text-white bg-red hover:bg-red-dark "
      }
    />
  );
}

function Icon(props: IButtonProps) {
  const { bgColor = "transparent" } = props;
  const color = props.bgColor ? "white" : "gray";
  const textColorClass = "text-" + color;
  const textHoverColorClass = "hover:text-" + color + "-700";
  const backgroundClass = "bg-" + bgColor;
  const backgroundHoverClass = "hover:bg-" + bgColor + "-dark";

  return (
    <BaseButton
      {...props}
      iconSize={props.iconSize ? props.iconSize : "lg"}
      buttonTypeClassNames={` focus:outline-none focus:ring-1 focus:ring-primary inline-flex justify-center items-center px-5 py-2 border leading-4 font-medium rounded-full shadow-sm focus: outline-none border-transparent ${textColorClass} ${backgroundClass} ${backgroundHoverClass} ${textHoverColorClass}} `}
    />
  );
}

function Cancel(props: IButtonProps) {
  const { title = "Cancel" } = props;
  return (
    <BaseButton
      {...props}
      title={title}
      buttonTypeClassNames={
        " focus:outline-none focus:ring-1 focus:ring-primary inline-flex justify-center items-center px-5 py-2 border leading-4 font-medium rounded-full shadow-sm focus: outline-none justify-center border-gray-300 text-gray-700 bg-white hover:bg-gray-50 "
      }
    />
  );
}

function Link(props: ILinkProps) {
  const { color = "primary" } = props;
  return <BaseLink {...props} color={color} />;
}

function LinkDanger(props: ILinkProps) {
  return <BaseLink {...props} color="red" />;
}

function BaseLink(props: ILinkBaseProps) {
  const { color, noPadding, to, target, tabIndex } = props;
  const textColorClass = "text-" + color;
  const textHoverColorClass = "hover:text-" + color + "-dark";

  const linkClassNames = `inline-flex items-center ${textColorClass} font-bold ${textHoverColorClass} focus:outline-none justify-center focus:underline ${
    props.small ? " text-xs " : " "
  } ${noPadding ? "" : " px-3 py-1 "}`;

  if (to) {
    if (target === "_blank") {
      return (
        <a href={to} target="_blank" rel="noopener noreferrer">
          <BaseButton {...props} buttonTypeClassNames={linkClassNames} />
        </a>
      );
    }
    return (
      <RouterLink to={to} tabIndex={tabIndex}>
        <BaseButton {...props} buttonTypeClassNames={linkClassNames} />
      </RouterLink>
    );
  } else {
    return <BaseButton {...props} buttonTypeClassNames={linkClassNames} />;
  }
}

function BaseButton(props: IButtonBaseProps) {
  const {
    isLoading,
    loadingTitle,
    icon,
    title,
    buttonTypeClassNames,
    className,
    isDisabled,
    type,
    id,
    iconSize,
    hoverTitle,
    leftRounded,
    rightRounded,
    iconClassName = "mr-3",
    color,
  } = props;

  const disabledOrLoading = isDisabled || isLoading;

  let iconToShow = icon;
  let iconClass = "";

  if (isLoading) {
    iconToShow = "sync";
    iconClass = " button-loader-spinning";
  }

  if (color) {
    iconClass += ` text-${color}`;
  }
  const textToShow = isLoading && loadingTitle ? loadingTitle + "..." : title;

  const roundedClass = `${leftRounded ? "rounded-r h-12 md:h-9 " : ""} ${
    rightRounded ? "rounded-l h-12 md:h-9 " : "rounded-full h-12 md:h-9 "
  }`;

  return (
    <button
      id={id}
      disabled={disabledOrLoading}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      tabIndex={props.tabIndex ?? 0}
      type={type ? type : "button"}
      title={hoverTitle}
      className={`button 
        ${roundedClass} 
        ${buttonTypeClassNames} 
        items-center 
        ${className ?? ""} 
        ${disabledOrLoading ? " opacity-50 pointer-events-none" : ""}`}
    >
      {iconToShow && (
        <FontAwesomeIcon
          icon={iconToShow}
          className={(textToShow ? iconClassName : "") + iconClass}
          size={iconSize ? iconSize : "sm"}
        />
      )}
      <div className={color ? `text-${color}` : ""}>{textToShow}</div>
    </button>
  );
}

function ButtonsPanel(props: IButtonsPanelProps) {
  const { noMargin, children, shouldAlignCenter, shouldAlignLeft } = props;
  let align = "justify-between";

  let nonEmptyChildren = [];

  if (Array.isArray(children)) {
    nonEmptyChildren = children.filter((child: any) => {
      return child;
    });
  }

  if (!Array.isArray(children) || nonEmptyChildren.length === 1) {
    align = "justify-end";
  }

  if (shouldAlignCenter) {
    align = "justify-center";
  }

  if (shouldAlignLeft) {
    align = "justify-start";
  }

  return (
    <div
      className={` w-full flex flex-col-reverse sm:flex-row space-y-4 sm:space-y-0 space-y-reverse space-x-0 sm:space-x-4 
        ${align} 
        ${noMargin ? "" : " mt-6 mb-1"}`}
    >
      {children}
    </div>
  );
}

function Download(props: {
  isDownloading: boolean;
  download: any;
  downloadType: string;
  isDisabled?: boolean;
  shouldHideTitle?: boolean;
}) {
  const { isDisabled, isDownloading, shouldHideTitle, downloadType } = props;
  return (
    <Button.Link
      isDisabled={isDisabled}
      onClick={() => props.download()}
      icon="download"
      isLoading={isDownloading}
      title={shouldHideTitle ? "" : "Download " + downloadType}
      loadingTitle={shouldHideTitle ? "" : "Download " + downloadType}
    />
  );
}

function Close(props: IButtonProps) {
  return (
    // @ts-ignore
    <div className="text-lg leading-6 font-bold text-gray-900" {...props}>
      <FontAwesomeIcon
        icon="times"
        size="sm"
        className="float-right cursor-pointer hover:text-gray-900 text-gray-700"
      />
    </div>
  );
}

const Button = {
  Primary,
  Secondary,
  Tertiary,
  Danger,
  Cancel,
  Link,
  LinkDanger,
  ButtonsPanel,
  Icon,
  Download,
  Close,
};

export { Button };
