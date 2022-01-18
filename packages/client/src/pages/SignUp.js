import React from "react";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import SignUp from "../components/SignUp";
import withPageAnalytics from "../hoc/withPageAnalytics";

export default withPageAnalytics(() => {
  return (
    <Section minHeight="100vh" justifyContent="center" display="flex">
      <Block display="flex" justifyContent="center" flexDirection="column">
        <SignUp />
      </Block>
    </Section>
  );
});
