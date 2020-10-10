import React, { Component } from "react";
import { Controller } from "../utils/form";

export default (WrappedComponent) =>
    class FormController extends Component {

        static defaultProps = {
            errors: {}
        };

        render() {
            const { name, control, rules, defaultValue, errors, ...rest } = this.props;

            return <Controller
                    name={name}
                    control={control}
                    rules={{ required: 'Required', maxLength: {
                        value: 20,
                        message: 'Max length is 20',
                    } }}
                    defaultValue={defaultValue}
                    render={props =>
                        <WrappedComponent {...rest} {...props} error={errors[name]}/>
                    }
                />;
        }
    };
