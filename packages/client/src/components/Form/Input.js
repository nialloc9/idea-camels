import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Icon } from "semantic-ui-react";
import { Input as StyledInput } from "../Styled/Input";
import {Error} from "./Error";
import {Warning} from "./Warning";
import withToolTip from "../../hoc/withToolTip";
import withFormController from "../../hoc/withFormController";

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
        const { label, info, error, warn, ...rest } = this.props;
        console.log("error", error)
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
                <Error error={error} />
                <Warning warn={warn} />
            </Form.Field>
        );
    }
}

export const FormInput = withFormController(Input);