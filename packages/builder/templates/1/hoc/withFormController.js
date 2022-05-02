import React, { Component } from "react";
import { Controller } from "../utils/form";

export default (WrappedComponent) =>
  class FormController extends Component {
    static defaultProps = {
      errors: {},
    };

    render() {
      const {
        name,
        control,
        rules,
        defaultValue,
        errors,
        ...rest
      } = this.props;

      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={(props) => (
            <WrappedComponent {...rest} {...props} error={errors[name]} />
          )}
        />
      );
    }
  };
