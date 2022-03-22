import React from "react";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import AccountDetails from "../components/AccountDetails";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { connect } from "../store";
import { onCreateAccount } from "../store/actions/account";

const Page = ({ onCreateAccount }) => {
  return (
    <Section minHeight="100vh" justifyContent="center" display="flex">
      <Block display="flex" justifyContent="center" flexDirection="column">
        <AccountDetails onSubmit={onCreateAccount} />
      </Block>
    </Section>
  );
};

export default connect(() => {}, { onCreateAccount })(withPageAnalytics(Page));
