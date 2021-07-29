const labelBaseClass = "font-semibold text-gray-900 mr-2 flex items-center";

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
}

// Implementation
function Label(props: ILabel) {
  let { children, htmlFor, className, noMargin } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={labelBaseClass + (noMargin ? "" : " mb-2 ") + " " + (className ? className : "")}
    >
      {children}
    </label>
  );
}

function LabelWithValue(props: ILabelWithValue) {
  let { label, value, noMargin } = props;

  return (
    <div className={"flex flex-row space-x-2" + (noMargin ? "" : "pt-2")}>
      <label className={labelBaseClass + (noMargin ? "" : " mb-2 ")}>{label}</label>
      <div>{value}</div>
    </div>
  );
}

export { Label, LabelWithValue };
