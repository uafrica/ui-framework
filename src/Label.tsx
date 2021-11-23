import { InfoButton } from "./InfoButton";

// Interface
interface ILabel {
  children?: any;
  className?: string;
  htmlFor?: any;
  noMargin?: boolean;
}

interface ILabelWithValue {
  label: string;
  value: any;
  noMargin?: boolean;
  info?: string;
}

// Implementation
function Label(props: ILabel) {
  let { children, htmlFor, className, noMargin } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={"u-label-text " + (noMargin ? "" : " mb-2 ") + " " + (className ? className : "")}
    >
      {children}
    </label>
  );
}

function LabelWithValue(props: ILabelWithValue) {
  let { label, value, noMargin, info } = props;

  return (
    <div className={"flex flex-row items-center flex-wrap " + (noMargin ? "" : " mb-2 pt-2")}>
      <label className={"u-label-text self-baseline"}>{label}</label>
      <div className="ml-2 text-left">{value}</div>
      {info && (
        <div>
          <InfoButton>{info}</InfoButton>
        </div>
      )}
    </div>
  );
}

export { Label, LabelWithValue };
