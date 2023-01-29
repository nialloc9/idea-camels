import React, { Component } from "react";
import { Grid, GridRow } from "../components/Grid";
import Create from "../components/CreateExperiment/Create";
import { Block } from "../components/Styled/Block";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import { onFetchDomainPrices } from "../store/actions/domain";
import { connect } from "../store";

class CreateExperiment extends Component {
  componentDidMount() {
    const { onFetchDomainPrices } = this.props;

    onFetchDomainPrices();
  }

  render() {
    return (
      <Block minHeight={remCalc(500)}>
        <Grid padded centered stackable>
          <GridRow columns={6}>
            <Create />
          </GridRow>
        </Grid>
      </Block>
    );
  }
}

const mapStateToProps = ({ experiment: { newExperiment } }) => ({
  newExperiment,
});

export default connect(mapStateToProps, {
  onFetchDomainPrices,
})(withPageAnalytics(CreateExperiment));
