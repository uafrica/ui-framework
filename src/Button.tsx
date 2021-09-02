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
  onClick?: any;
  center?: boolean;
  className?: string;
  disabled?: boolean;
  hoverTitle?: string;
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
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "items-center justify-center px-5 py-2 border border-transparent leading-4 font-medium rounded-full text-white bg-primary hover:bg-primary-dark"
      }
      type="submit"
    />
  );
}

function Secondary(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "inline-flex items-center justify-center px-5 py-2 border border-primary leading-4 font-medium rounded-full text-primary bg-white hover:bg-primary hover:text-white focus:outline-none"
      }
    />
  );
}

function Tertiary(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "inline-flex items-center justify-center px-5 py-2 border border-gray-900 leading-4 font-medium rounded-md text-gray-99 bg-white hover:text-primary hover:border-primary focus:outline-none"
      }
    />
  );
}

function Danger(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      buttonTypeClassNames={
        "items-center justify-center px-5 py-2 border border-transparent leading-4 font-medium rounded-full text-white bg-red hover:bg-red-dark"
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
        "items-center justify-center p-2 border border-transparent leading-4 font-medium rounded-full text-" +
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
        "inline-flex items-center justify-center px-5 py-2 border border-gray-300 shadow-sm leading-4 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
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
    "-dark focus:outline-none justify-center " +
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
      <RouterLink to={props.to}>
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
    hoverTitle
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
      type={type ? type : "button"}
      title={hoverTitle}
      className={
        "h-9 " +
        buttonTypeClassNames +
        " " +
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
    <div
      className={
        "flex w-full flex-col-reverse xs:flex-row space-y-4 xs:space-y-0 space-y-reverse " +
        align +
        (noMargin ? "" : " mt-6")
      }
    >
      {children}
    </div>
  );
}

function Download(props: { isDownloading: boolean; download: any; downloadType: string }) {
  return (
    <Button.Link
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
