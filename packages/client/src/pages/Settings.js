import React from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Block } from "../components/Styled/Block";
import { Segment } from "../components/Styled/Segment";
import { Header } from "../components/Styled/Header";
import Billing from "../components/Billing";
import AccountDetails from "../components/AccountDetails";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import { connect } from "../store";
import { onUpdateAccount } from "../store/actions/account";

const Page = ({
  updateSuccessMesssage,
  firstName,
  lastName,
  phone,
  email,
  onUpdateAccount,
}) => (
  <Block minHeight={remCalc(500)}>
    <Grid padded centered stackable>
      <GridRow columns={2}>
        <GridColumn>
          <Segment padded>
            <Header>Account</Header>
            <AccountDetails
              passwordRequired={false}
              successMessage={updateSuccessMesssage}
              buttonText="Update"
              onSubmit={onUpdateAccount}
              initialValues={{ firstName, lastName, phone, email }}
              analyticsLabel="settings-page"
            />
          </Segment>
        </GridColumn>
        <GridColumn>
          <Segment padded>
            <Billing />
          </Segment>
        </GridColumn>
      </GridRow>
    </Grid>
  </Block>
);

export default connect(
  ({
    account: {
      updateSuccessMesssage,
      data: { firstName, lastName, phone, email },
    },
  }) => ({ updateSuccessMesssage, firstName, lastName, phone, email }),
  { onUpdateAccount }
)(withPageAnalytics(Page));
