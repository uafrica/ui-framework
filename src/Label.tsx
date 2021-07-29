const labelBaseClass = "font-semibold text-gray-900 mb-2 mr-2 flex items-center";

// Interface
interface ILabel {
  children?: any;
  className?: string;
  htmlFor?: any;
}

interface ILabelWithValue {
  label: string;
  value: any;
}

// Implementation
function Label(props: ILabel) {
  let { children, htmlFor, className } = props;

  return (
    <label htmlFor={htmlFor} className={labelBaseClass + " " + (className ? className : "")}>
      {children}
    </label>
  );
}

function LabelWithValue(props: ILabelWithValue) {
  let { label, value } = props;

  return (
    <div className="flex flex-row space-x-2 pt-2">
      <label className={labelBaseClass}>{label}</label>
      <div>{value}</div>
    </div>
  );
}

export { Label, LabelWithValue };
