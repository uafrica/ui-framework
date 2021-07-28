import React, { Component } from "react";

export default class TextAreaEditable extends Component {
  onValueChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    if (this.props.editing) {
      return (
        <div>
          <div className="form-group">
            {this.props.label && <label htmlFor="textarea"> {this.props.label} </label>}
            <textarea
              className="form-control"
              autoComplete={this.props.label}
              name="textarea"
              value={this.props.value}
              onChange={this.onValueChange}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          {this.props.label && <label htmlFor="textarea"> {this.props.label} </label>}
          <textarea
            className="form-control"
            autoComplete={this.props.label}
            name="textarea"
            value={this.props.value}
            readOnly
            onClick={() => this.props.onEdit(true)}
          />
        </div>
      </div>
    );
  }
}
