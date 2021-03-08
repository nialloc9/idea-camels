import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SemanticForm from 'semantic-ui-react/dist/commonjs/collections/Form';
import {Error} from './Error';
import {Warning} from './Warning';
import {Success} from './Success';

export const Field = SemanticForm.Field;

export class Form extends PureComponent {
    static propTypes = {
        isCompactError: PropTypes.bool,
        isCompactWarning: PropTypes.bool,
        isCompactSuccess: PropTypes.bool,
        error: PropTypes.string,
        warning: PropTypes.string,
        success: PropTypes.string,
    };

    static defaultProps = {
        isCompactError: false,
        isCompactWarning: false,
        isCompactSuccess: false,
        error: '',
        warning: '',
        success: '',
    };

    render() {
        const {
            children,
            isCompactError,
            isCompactWarning,
            isCompactSuccess,
            error,
            warning,
            success,
            ...rest
        } = this.props;

        return (
            <SemanticForm {...rest}>
                {children}
                <Error error={error} compact={isCompactError} />
                <Warning
                    warning={warning}
                    compact={isCompactWarning}
                />
                <Success
                    success={success}
                    compact={isCompactSuccess}
                />
            </SemanticForm>
        );
    }
}