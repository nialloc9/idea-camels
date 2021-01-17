import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, GridColumn} from '../Grid';
import {remCalc} from '../../utils/style';
import {FormInput} from '../Form/Input';
import {FormCheckbox} from '../Form/Checkbox';
import {Form} from '../Form/Form';
import {
    validateEmail,
    validateRequiredEmail,
    validateRequiredPassword
} from '../../utils/form';
import {Block} from '../Styled/Block';
import {Button} from '../Styled/Button';
import {Header} from '../Styled/Header';
import {withForm} from '../../hoc/withForm';

class LoginForm extends Component {
    static propTypes = {
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
            submitting,
            valid,
            pristine,
            errorMessage,
            onModalCancel,
            onResetPasswordClick,
            onSubmit
        } = this.props;
       
        return (
            <Form error={errorMessage} onSubmit={onSubmit}>
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
                                    rules={[validateRequiredEmail,validateEmail]}
                                    pristine={pristine}
                                />
                            </GridColumn>
                            <GridColumn>
                                <FormInput
                                    name="password"
                                    size="small"
                                    type="password"
                                    placeholder="Password*"
                                    maxLength={40}
                                    rules={[validateRequiredPassword]}
                                />
                            </GridColumn>
                        </Grid>
                    </GridColumn>

                    <GridColumn>
                        <Block margin={`${remCalc(-15)} 0`} display="flex" flexDirection="row">
                            <Block>
                                <FormCheckbox
                                    name="rememberMe"
                                    size="small"
                                    placeholder="Keep me loggedin"
                                />
                            </Block>
                            <Block
                                margin={`0 ${remCalc(10)}`}
                                display="flex" 
                                justifyContent="center" 
                                flexDirection="column"
                            >
                                Remember Me -
                            </Block>
                            <Block
                                onClick={onResetPasswordClick}
                                cursor="pointer"
                                color="blue"
                                display="flex" 
                                justifyContent="center" 
                                flexDirection="column"
                            >
                                Forgotton password?
                            </Block>
                        </Block>
                    </GridColumn>

                    <GridColumn>
                        <Button
                            disabled={submitting || !valid}
                            loading={submitting}
                            primary
                            type="submit"
                            margin={`0 ${remCalc(10)} 0 0`}
                        >
                            Submit
                        </Button>
                        <Button type="button" onClick={onModalCancel}>Cancel</Button>
                    </GridColumn>
                </Grid>
            </Form>
        );
    }
}

export default withForm(LoginForm)