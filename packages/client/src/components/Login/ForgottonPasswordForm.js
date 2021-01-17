import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {remCalc} from '../../utils/style';
import {FormInput} from '../Form/Input';
import {Form} from '../Form/Form';
import {Grid, GridColumn} from '../Grid';
import {validateEmail, validateRequiredEmail} from '../../utils/form';
import {Block} from '../Styled/Block';
import {Button} from '../Styled/Button';
import {Header} from '../Styled/Header';
import {withForm} from '../../hoc/withForm';

class ForgottenPasswordForm extends Component {
    static propTypes = {
        pristine: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired,
        successMessage: PropTypes.string.isRequired,
        onModalBack: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        size: PropTypes.string,
    };

    static defaultProps = {
        size: 'tiny',
    };

    render() {
        const {
            isLoading,
            errorMessage,
            successMessage,
            onModalBack,
            onSubmit
        } = this.props;

        return (
            <Grid container stackable columns={1}>
                <GridColumn>
                    <Form
                        error={errorMessage}
                        success={successMessage}
                        onSubmit={onSubmit}
                    >
                        <Grid stackable columns={1}>
                            <GridColumn>
                                <Header>Forgotten password</Header>
                                <Block>
                                    To reset your password please enter your
                                    email below.
                                </Block>
                                <br />
                                <FormInput
                                    name="email"
                                    size="small"
                                    type="text"
                                    placeholder="Email*"
                                    maxLength={40}
                                    rules={[validateRequiredEmail, validateEmail]}
                                />
                            </GridColumn>
                            <GridColumn>
                                <Button
                                    loading={isLoading}
                                    primary
                                    type="submit"
                                    margin={`0 ${remCalc(10)} 0 0`}
                                >
                                    Submit
                                </Button>
                                <Button onClick={onModalBack}>Back</Button>
                            </GridColumn>
                        </Grid>
                    </Form>
                </GridColumn>
            </Grid>
        );
    }
}

export default withForm(ForgottenPasswordForm)