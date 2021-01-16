import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Icon } from "semantic-ui-react";
import { Input as StyledInput } from "../Styled/Input";
import {Error} from "./Error";
import {Warning} from "./Warning";
import withToolTip from "../../hoc/withToolTip";
import {withField} from "../../hoc/withForm";

const ToolTipIcon = withToolTip(Icon);
export class Input extends Component {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        info: PropTypes.string
    };

    static defaultProps = {
        info: ""
    }

    render() {
        const { label, info,  error, warn, touched, ...rest } = this.props;

        return (
            <Form.Field>
                <label style={{ fontWeight: 800, marginBottom: "10px" }}>
                    {label}
                    {info !== "" && (
                        <ToolTipIcon
                            name="info circle"
                            tooltip={info}
                            color="orange"
                        />
                    )}
                </label>
                <StyledInput {...rest} />
                <Error error={error && touched ? error : ""} />
                <Warning warn={warn && touched ? warn : ""} />
            </Form.Field>
        );
    }
}

export const FormInput = withField(Input);