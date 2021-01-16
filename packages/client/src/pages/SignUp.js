import React from "react";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import SignUp from "../components/SignUp";
import withPageAnalytics from "../hoc/withPageAnalytics";


export default withPageAnalytics(() => {

    // use validate on whole form component to check against full form data to see if confirm password and password are correct
    const onSubmit = data => console.log('data', data)
    
    return (
        <Section minHeight="100vh" justifyContent="center" display="flex">
            <Block display="flex" justifyContent="center" flexDirection="column">
               <SignUp />
            </Block>
        </Section>
    )
});

