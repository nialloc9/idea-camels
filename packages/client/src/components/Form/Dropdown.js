import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Icon } from "semantic-ui-react";
import { Dropdown as StyledDropdown } from "../Styled/Dropdown";
import { Error } from "./Error";
import { Warning } from "./Warning";
import withToolTip from "../../hoc/withToolTip";
import { withField } from "../../hoc/withForm";

const ToolTipIcon = withToolTip(Icon);
export class Dropdown extends Component {
  static propTypes = {
    label: PropTypes.any,
    info: PropTypes.string,
  };

  static defaultProps = {
    info: "",
  };

  handleChange = (e, { value }) => {
    const { onChange } = this.props;

    onChange(value);
  };

  render() {
    const {
      label,
      info,
      error,
      customError,
      warn,
      touched,
      ...rest
    } = this.props;

    const formError = customError || error;
    const formTouched = customError || touched ? true : false;

    return (
      <Form.Field>
        <label style={{ fontWeight: 800 }}>
          {label}
          {info !== "" && (
            <ToolTipIcon name="info circle" tooltip={info} color="orange" />
          )}
        </label>
        <StyledDropdown
          error={formError && formTouched}
          {...rest}
          onChange={this.handleChange}
        />
        <Error error={formError && formTouched ? formError : ""} />
        <Warning warn={warn && touched ? warn : ""} />
      </Form.Field>
    );
  }
}

export const FormDropdown = withField(Dropdown);
