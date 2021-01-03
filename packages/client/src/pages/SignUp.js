import React from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Button } from "../components/Styled/Button";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import { Form, Field } from "../components/Form/Form";
import { FormInput } from "../components/Form/Input";
import withPageAnalytics from "../hoc/withPageAnalytics";
import {useForm, pipeline, validateRequiredName, validateRequiredLastName, validateRequiredEmail, validateEmail, validateRequired, validateMaxLength, validateRequiredPassword, validateRequiredPasswordConfirmation} from "../utils/form";


export default withPageAnalytics(() => {

    const { control, handleSubmit, errors, setError } = useForm();
    const onSubmit = data => {

        if(data.password !== data.confirmPassword) {
            setError("password", {message: "Passwords must match"});
            setError("confirmPassword", {message: "Passwords must match"});
        }
    };
    
    return (
        <Section minHeight="100vh" justifyContent="center" display="flex">
            <Block display="flex" justifyContent="center" flexDirection="column">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container centered stackable>
                        <GridRow centered columns={2}>
                            <GridColumn>
                                <Field>
                                    <FormInput 
                                        label="First Name"
                                        name="firstName"
                                        control={control}
                                        rules={{ validate: value => pipeline([validateRequiredName], value) }}
                                        defaultValue=""
                                        errors={errors}
                                    />
                                </Field>
                            </GridColumn>
                            <GridColumn>
                                <Field>
                                <FormInput 
                                        label="Last Name"
                                        name="lastName"
                                        control={control}
                                        rules={{ validate: value => pipeline([validateRequiredLastName, validateMaxLength(20)], value) }}
                                        defaultValue=""
                                        errors={errors}
                                    />
                                </Field>
                            </GridColumn>
                        </GridRow>
                        <GridRow centered columns={2}>
                            <GridColumn>
                            <Field>
                                <FormInput 
                                        label="Email"
                                        name="email"
                                        control={control}
                                        rules={{ validate: value => pipeline([validateRequiredEmail, validateEmail, validateMaxLength(100)], value) }}
                                        defaultValue=""
                                        errors={errors}
                                    />
                                </Field>
                            </GridColumn>
                            <GridColumn>
                            <Field>
                                <FormInput 
                                        label="Phone"
                                        name="phone"
                                        type="number"
                                        control={control}
                                        rules={{ validate: value => pipeline([validateRequired], value) }}
                                        defaultValue=""
                                        errors={errors}
                                    />
                                </Field>
                            </GridColumn>
                        </GridRow>
                        <GridRow centered columns={2}>
                            <GridColumn>
                            <Field>
                                <FormInput 
                                        label="Password"
                                        name="password"
                                        type="password"
                                        control={control}
                                        rules={{ validate: value => pipeline([validateRequiredPassword], value) }}
                                        defaultValue=""
                                        errors={errors}
                                    />
                                </Field>
                            </GridColumn>
                            <GridColumn>
                            <Field>
                                <FormInput 
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        control={control}
                                        rules={{ validate: value => pipeline([validateRequiredPasswordConfirmation], value) }}
                                        defaultValue=""
                                        errors={errors}
                                    />
                                </Field>
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn><Button onClick={handleSubmit(onSubmit)}>Sign Up</Button></GridColumn>
                        </GridRow>
                    </Grid>
                </Form>
            </Block>
        </Section>
    )
});

