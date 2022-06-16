import React, { Component } from "react";
import AccountDetails from "../components/AccountDetails";
import { Block } from "../components/Styled/Block";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { connect } from "../store";
import { onResetPassword } from "../store/actions/account";
import { remCalc } from "../utils/style";

class PasswordRest extends Component {
  render() {
    const { successMessage, onSubmit } = this.props;

    return (
      <Block textAlign="center" margin="auto" minHeight={remCalc(400)}>
        <AccountDetails
          isCompactError
          isCompactSuccess
          shouldShowFirstName={false}
          shouldShowLastName={false}
          shouldShowEmail={false}
          shouldShowPhone={false}
          successMessage={successMessage}
          onSubmit={onSubmit}
        />
      </Block>
    );
  }
}

const mapStateToProps = ({ account: { resetPasswordSuccessMessage } }) => ({
  successMessage: resetPasswordSuccessMessage,
});

export default connect(mapStateToProps, {
  onSubmit: onResetPassword,
})(withPageAnalytics(PasswordRest));
