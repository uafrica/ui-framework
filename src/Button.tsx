import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link as RouterLink } from "react-router-dom";

// Interfaces
interface IButtonProps {
  id?: string;
  title?: string;
  loadingTitle?: string;
  isLoading?: boolean;
  icon?: IconProp;
  iconSize?: SizeProp;
  tabIndex?: number | undefined;
  onClick?: any;
  center?: boolean;
  className?: string;
  disabled?: boolean;
  hoverTitle?: string;
  leftRounded?: boolean;
  rightRounded?: boolean;
  bgColor?: string; // overrides icon bg
}

interface ILinkProps {
  id?: string;
  title?: string;
  small?: boolean;
  icon?: IconProp;
  color?: string;
  onClick?: any;
  center?: boolean;
  className?: string;
  disabled?: boolean;
  loadingTitle?: string;
  hoverTitle?: string;
  isLoading?: boolean;
  to?: string;
  target?: string;
  noPadding?: boolean;
  tabIndex?: number | undefined;
}

interface ILinkBaseProps extends ILinkProps {
  color: string;
}

interface IButtonsPanelProps {
  children: any;
  center?: boolean;
  left?: boolean;
  noMargin?: boolean;
}

interface IButtonBaseProps extends IButtonProps {
  buttonTypeClassNames: string;
  iconSize?: SizeProp;
  type?: "button" | "submit" | "reset" | undefined;
}

// Implementation
function Primary(props: IButtonProps) {
  let bgColor = props.bgColor ? props.bgColor : "primary";

  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "focus:outline-none focus:ring-1 focus:ring-primary u-button border-transparent text-white bg-" +
        bgColor +
        " hover:bg-" +
        bgColor +
        "-dark"
      }
      type="submit"
    />
  );
}

function Secondary(props: IButtonProps) {
  let bgColor = props.bgColor ? props.bgColor : "primary";

  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "u-focus u-button border-" +
        bgColor +
        " text-" +
        bgColor +
        " bg-white hover:bg-" +
        bgColor +
        " hover:text-white "
      }
    />
  );
}

function Tertiary(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "u-focus u-button border-gray-900 text-gray-99 bg-white hover:text-primary hover:border-primary "
      }
    />
  );
}

function Danger(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "focus:outline-none focus:ring-1 focus:ring-red u-button border-transparent text-white bg-red hover:bg-red-dark "
      }
    />
  );
}

function Icon(props: IButtonProps) {
  let bgColor = props.bgColor ? props.bgColor : "transparent";
  let color = props.bgColor ? "white" : "gray";

  return (
    <BaseButton
      {...props}
      iconSize={props.iconSize ? props.iconSize : "lg"}
      buttonTypeClassNames={
        "u-focus u-button border-transparent text-" +
        color +
        " bg-" +
        bgColor +
        " hover:bg-" +
        bgColor +
        "-dark hover:text-" +
        color +
        "-700"
      }
    />
  );
}

function Cancel(props: IButtonProps) {
  let title = props.title ? props.title : "Cancel";
  return (
    <BaseButton
      {...props}
      title={title}
      buttonTypeClassNames={
        "u-focus u-button justify-center border-gray-300 text-gray-700 bg-white hover:bg-gray-50 "
      }
    />
  );
}

function Link(props: ILinkProps) {
  return <BaseLink {...props} color={props.color ? props.color : "primary"} />;
}

function LinkDanger(props: ILinkProps) {
  return <BaseLink {...props} color="red" />;
}

function BaseLink(props: ILinkBaseProps) {
  const linkClassNames =
    "inline-flex items-center text-" +
    props.color +
    " font-bold hover:text-" +
    props.color +
    "-dark focus:outline-none justify-center focus:underline " +
    (props.small ? " text-xs " : " ") +
    (props.noPadding ? "" : " px-3 py-1 ");

  if (props.to) {
    if (props.target === "_blank") {
      return (
        <a href={props.to} target="_blank" rel="noopener noreferrer">
          <BaseButton {...props} buttonTypeClassNames={linkClassNames} />
        </a>
      );
    }
    return (
      <RouterLink to={props.to} tabIndex={props.tabIndex}>
        <BaseButton {...props} buttonTypeClassNames={linkClassNames} />
      </RouterLink>
    );
  } else {
    return <BaseButton {...props} buttonTypeClassNames={linkClassNames} />;
  }
}

function BaseButton(props: IButtonBaseProps) {
  let {
    isLoading,
    loadingTitle,
    icon,
    title,
    center,
    buttonTypeClassNames,
    className,
    disabled,
    type,
    id,
    iconSize,
    hoverTitle,
    leftRounded,
    rightRounded
  } = props;

  let disabledOrLoading = disabled || isLoading;

  let iconToShow = icon;
  let iconClass = "";

  if (isLoading) {
    iconToShow = "sync";
    iconClass = "button-loader-spinning";
  }

  let textToShow = isLoading && loadingTitle ? loadingTitle + "..." : title;

  return (
    <button
      id={id}
      disabled={disabledOrLoading}
      onClick={props.onClick}
      tabIndex={props.tabIndex ?? 0}
      type={type ? type : "button"}
      title={hoverTitle}
      className={
        (leftRounded ? "rounded-r h-9" : rightRounded ? "rounded-l h-9" : "rounded-full h-9 ") +
        buttonTypeClassNames +
        " items-center " +
        (center ? " block mx-auto " : "") +
        (className ? className : "") +
        (disabledOrLoading ? " opacity-50 pointer-events-none" : "")
      }
    >
      {iconToShow && (
        <FontAwesomeIcon
          icon={iconToShow}
          className={(textToShow ? "mr-3 " : "") + iconClass}
          size={iconSize ? iconSize : "sm"}
        />
      )}
      {textToShow}
    </button>
  );
}

function ButtonsPanel(props: IButtonsPanelProps) {
  let { noMargin, children, center, left } = props;
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

  if (center) {
    align = "justify-center";
  }

  if (left) {
    align = "justify-start";
  }

  return (
    <div className={" w-full u-reverse-flex-col-to-row " + align + (noMargin ? "" : " mt-6")}>
      {children}
    </div>
  );
}

function Download(props: {
  isDownloading: boolean;
  download: any;
  downloadType: string;
  disabled?: boolean;
}) {
  return (
    <Button.Link
      disabled={props.disabled}
      onClick={() => props.download()}
      icon="download"
      isLoading={props.isDownloading}
      title={"Download " + props.downloadType}
      loadingTitle={"Download " + props.downloadType}
    />
  );
}

function Close(props: IButtonProps) {
  return (
    <div className="text-lg leading-6 font-bold  text-gray-900" {...props}>
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
  Close
};

export { Button };
