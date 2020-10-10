import React from "react";
import { useForm } from "react-hook-form";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Button } from "../components/Styled/Button";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import { Form, Field } from "../components/Form/Form";
import { FormInput, Input } from "../components/Form/Input";
import withPageAnalytics from "../hoc/withPageAnalytics";

export default withPageAnalytics(() => {

    const { control, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    
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
                                        rules={{ required: 'Required', maxLength: {
                                            value: 20,
                                            message: 'Max length is 20',
                                          } }}
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
                                        rules={{ required: 'Required', maxLength: {
                                            value: 20,
                                            message: 'Max length is 20',
                                          } }}
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
                                        rules={{ required: 'Required', pattern: "/^\S+@\S+\.\S+$/" }}
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
                                        rules={{ required: 'Required', maxLength: {
                                            value: 20,
                                            message: 'Max length is 20',
                                          } }}
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
                                        rules={{ required: 'Required' }}
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
                                        rules={{ required: 'Required' }}
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
