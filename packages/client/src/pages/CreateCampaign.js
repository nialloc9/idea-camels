import React from "react";
import { Block } from "../components/Styled/Block";
import { Section } from "../components/Styled/Section";
import CreateCampaign from "../components/CreateCampaign";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { connect } from "../store";
import { onCreate } from "../store/actions/campaign";

const Page = ({ onCreateCampaign }) => {
  return (
    <Section minHeight="165vh" justifyContent="center" display="flex">
      <Block display="flex" justifyContent="center" flexDirection="column">
        <CreateCampaign onSubmit={onCreateCampaign} />
      </Block>
    </Section>
  );
};

export default connect(() => {}, { onCreateCampaign: onCreate })(
  withPageAnalytics(Page)
);
