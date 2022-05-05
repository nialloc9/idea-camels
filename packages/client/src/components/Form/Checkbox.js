import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Checkbox as StyledCheckbox } from "../Styled/Checkbox";
import { Icon } from "../Styled/Icon";
import { Field } from "./Form";
import { Error } from "./Error";
import { Warning } from "./Warning";
import { remCalc } from "../../utils/style";
import withToolTip from "../../hoc/withToolTip";
import { withField } from "../../hoc/withForm";

const ToolTipIcon = withToolTip(Icon);

export class Checkbox extends PureComponent {
  static propTypes = {
    inlineLabel: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    warn: PropTypes.string,
    info: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    inlineLabel: false,
    info: "",
  };

  handleChange = (e, { checked }) => {
    const { onChange } = this.props;
    onChange(checked);
  };

  render = () => {
    const {
      label,
      inlineLabel,
      info,
      error,
      warn,
      value,
      touched = false,
      ...rest
    } = this.props;

    const Label = (
      <label>
        {info !== "" && (
          <ToolTipIcon name="info circle" tooltip={info} color="orange" />
        )}
        {label}
      </label>
    );

    return (
      <Field>
        {!inlineLabel && Label}
        <StyledCheckbox
          {...rest}
          touched={touched.toString()}
          label={inlineLabel ? Label : undefined}
          checked={value ? true : false}
          onChange={this.handleChange}
          margin={`${remCalc(4)} 0 0 ${remCalc(5)}`}
        />
        <Error error={error} />
        <Warning warn={warn} />
      </Field>
    );
  };
}

export const FormCheckbox = withField(Checkbox);
