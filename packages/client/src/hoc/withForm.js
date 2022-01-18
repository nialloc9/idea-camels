import React, { Component } from 'react'
import { Form as ReactFinalForm, Field as ReactFinalField } from 'react-final-form'
import { pipelineHof } from '../utils/form'

export const withForm = (WrappedComponent) =>
    class Event extends Component {
        render() {
            const { onSubmit, ...rest } = this.props;

            return (
                <ReactFinalForm onSubmit={onSubmit}>
                    {({ handleSubmit, ...formProps }) => <WrappedComponent {...formProps} {...rest} onSubmit={handleSubmit} />}
                </ReactFinalForm>
            );
        }
    };

export const withField = (WrappedComponent) =>
    class WrappedField extends Component {
        render() {
            const { name, validate = [], ...rest } = this.props;

            return (
                <ReactFinalField name={name} validate={pipelineHof(validate)}>
                    {({ input, meta }) => <WrappedComponent {...rest} name={name} {...input} {...meta} />}
                </ReactFinalField>
            );
        }
    };