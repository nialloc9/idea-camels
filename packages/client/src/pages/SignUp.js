import React from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Button } from "../components/Styled/Button";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import { ValidationForm } from "../components/Form/Form";
import { FormInput } from "../components/Form/Input";
import withPageAnalytics from "../hoc/withPageAnalytics";
import {validateRequiredName, validateRequiredLastName, validateRequiredEmail, validateEmail, validateRequired, validateMaxLength, validateRequiredPassword, validateRequiredPasswordConfirmation} from "../utils/form";


export default withPageAnalytics(() => {

    const onSubmit = data => console.log('data', data)
    
    return (
        <Section minHeight="100vh" justifyContent="center" display="flex">
            <Block display="flex" justifyContent="center" flexDirection="column">
                <ValidationForm onSubmit={onSubmit}>
                    <Grid container centered stackable>
                        <GridRow centered columns={2}>
                            <GridColumn>
                                    <FormInput 
                                        label="First Name"
                                        name="firstName"
                                        defaultValue=""
                                        validate={[validateRequiredName]}
                                    />
                            </GridColumn>
                            <GridColumn>
                            <FormInput 
                                        label="Last Name"
                                        name="lastName"
                                        defaultValue=""
                                        validate={[validateRequiredLastName, validateMaxLength(20)]}
                                    />
                            </GridColumn>
                        </GridRow>
                        <GridRow centered columns={2}>
                            <GridColumn>
                            <FormInput 
                                        label="Email"
                                        name="email"
                                        defaultValue=""
                                        validate={[validateRequiredEmail, validateEmail, validateMaxLength(100)]}
                                    />
                            </GridColumn>
                            <GridColumn>
                            <FormInput 
                                        label="Phone"
                                        name="phone"
                                        type="number"
                                        defaultValue=""
                                        validate={[validateRequired]}
                                    />
                            </GridColumn>
                        </GridRow>
                        <GridRow centered columns={2}>
                            <GridColumn>
                            <FormInput 
                                        label="Password"
                                        name="password"
                                        type="password"
                                        defaultValue=""
                                        validate={[validateRequiredPassword]}
                                    />
                            </GridColumn>
                            <GridColumn>
                            <FormInput 
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        defaultValue=""
                                        validate={[validateRequiredPasswordConfirmation]}
                                    />
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn><Button onClick={onSubmit}>Sign Up</Button></GridColumn>
                        </GridRow>
                    </Grid>
                </ValidationForm>
            </Block>
        </Section>
    )
});

