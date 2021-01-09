import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, GridColumn} from '../Grid';
import {remCalc} from '../../utils/style';
import {FormInput} from '../Form/Input';
import {FormCheckbox} from '../Form/Checkbox';
import {ValidationForm} from '../Form/Form';
import {
    validateEmail,
    validateRequiredEmail,
    validateRequiredPassword,
    composeValidators
} from '../../utils/form';
import {Block} from '../Styled/Block';
import {Button} from '../Styled/Button';
import {Header} from '../Styled/Header';

class LoginForm extends Component {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        onModalCancel: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onResetPasswordClick: PropTypes.func.isRequired,
        size: PropTypes.string,
    };

    static defaultProps = {
        size: 'tiny',
    };

    render() {
        
        const {
            pristine,
            errorMessage,
            submitting,
            onModalCancel,
            onResetPasswordClick,
            onSubmit
        } = this.props;
        
        return (
            <ValidationForm error={errorMessage} onSubmit={onSubmit}>
                <Grid stackable container columns={1}>
                    <GridColumn>
                        <Grid columns={2} stackable>
                            <GridColumn>
                                <Header>Login</Header>
                            </GridColumn>
                            <GridColumn />
                            <GridColumn>
                                <FormInput
                                    name="email"
                                    size="small"
                                    type="text"
                                    placeholder="Email*"
                                    maxLength={40}
                                    validate={composeValidators(validateRequiredEmail,validateEmail)}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    name="password"
                                    size="small"
                                    type="password"
                                    placeholder="Password*"
                                    maxLength={40}
                                    validate={composeValidators(validateRequiredPassword)}
                                />
                            </GridColumn>
                        </Grid>
                    </GridColumn>

                    <GridColumn>
                        <Block margin={`${remCalc(-15)} 0`}>
                            <Block display="inline-block">
                                <FormCheckbox
                                    name="rememberMe"
                                    size="small"
                                    placeholder="Keep me loggedin"
                                />
                            </Block>
                            <Block
                                margin={`0 ${remCalc(10)}`}
                                display="inline-block"
                            >
                                Remember Me -
                            </Block>
                            <Block
                                display="inline-block"
                                onClick={onResetPasswordClick}
                                cursor="pointer"
                            >
                                Forgotton password?
                            </Block>
                        </Block>
                    </GridColumn>

                    <GridColumn>
                        <Button
                            disabled={pristine || submitting}
                            loading={submitting}
                            primary
                            type="submit"
                            margin={`0 ${remCalc(10)} 0 0`}
                        >
                            Submit
                        </Button>
                        <Button onClick={onModalCancel}>Cancel</Button>
                    </GridColumn>
                </Grid>
            </ValidationForm>
        );
    }
}

export default LoginForm