interface IProps {
  onChange: any;
  onEdit: any;
  value: any;
  label?: string;
  editing?: boolean;
}

function TextAreaEditable(props: IProps) {
  if (props.editing) {
    return (
      <div>
        <div className="form-group">
          {props.label && <label htmlFor="textarea"> {props.label} </label>}
          <textarea
            className="form-control"
            autoComplete={props.label}
            name="textarea"
            value={props.value}
            onChange={(event: any) => props.onChange(event.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {props.label && <label htmlFor="textarea"> {props.label} </label>}
        <textarea
          className="form-control"
          autoComplete={props.label}
          name="textarea"
          value={props.value}
          readOnly
          onClick={() => props.onEdit(true)}
        />
      </div>
    </div>
  );
}

export { TextAreaEditable };
