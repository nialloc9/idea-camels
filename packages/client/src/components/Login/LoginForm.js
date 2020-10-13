import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, GridColumn} from '../Grid';
import {remCalc} from '../../utils/style';
import {Input, FormInput} from '../Form/Input';
import {Form} from '../Form/Form';
import {Checkbox} from '../Form/Checkbox';
import {
    validateEmail,
    validateRequiredEmail,
    validateRequiredPassword,
    pipeline,
    useForm
} from '../../utils/form';
import {Block} from '../Styled/Block';
import {Button} from '../Styled/Button';
import {Header} from '../Styled/Header';

export class LoginForm extends Component {
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

    onSubmit = data => console.log(data)

    render() {

        const { control, handleSubmit, errors } = useForm();

        const {
            pristine,
            errorMessage,
            submitting,
            onModalCancel,
            handleSubmit,
            onResetPasswordClick,
        } = this.props;

        return (
            <Form error={errorMessage} onSubmit={handleSubmit(this.onSubmit)}>
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
                                    rules={{ validate: value => pipeline([
                                        validateRequiredEmail,
                                        validateEmail,
                                    ], value) }}
                                    control={control}
                                    errors={errors}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    name="password"
                                    size="small"
                                    type="password"
                                    placeholder="Password*"
                                    maxLength={40}
                                    component={Input}
                                    rules={{ validate: value => pipeline([
                                        validateRequiredPassword
                                    ], value) }}
                                    control={control}
                                    errors={errors}
                                />
                            </GridColumn>
                        </Grid>
                    </GridColumn>

                    <GridColumn>
                        <Block margin={`${remCalc(-15)} 0`}>
                            <Block display="inline-block">
                                <Field
                                    name="rememberMe"
                                    size="small"
                                    placeholder="Keep me loggedin"
                                    component={Checkbox}
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
            </Form>
        );
    }
}