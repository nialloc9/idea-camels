import React, { Component } from "react";
import { Grid, GridRow } from "../components/Grid";
import Create from "../components/CreateExperiment/Create";
import { Block } from "../components/Styled/Block";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import { onFetchDomainPrices } from "../store/actions/domain";
import { connect } from "../store";

class CreateExperiment extends Component {
  // get forms() {
  //   return [
  //     {
  //       form: CreateForm,
  //       index: 0,
  //       props: {},
  //     },
  //     {
  //       form: Template,
  //       index: 1,
  //       props: {},
  //     },
  //   ];
  // }

  componentDidMount() {
    const { onFetchDomainPrices } = this.props;

    onFetchDomainPrices();
  }

  render() {
    const { formIndex } = this.props;

    return (
      <Block minHeight={remCalc(500)}>
        <Grid padded centered stackable>
          <GridRow>
            <Create />
          </GridRow>
        </Grid>
      </Block>
    );
  }
}

const mapStateToProps = ({ experiment: { formIndex, newExperiment } }) => ({
  formIndex,
  newExperiment,
});

export default connect(mapStateToProps, {
  onFetchDomainPrices,
})(withPageAnalytics(CreateExperiment));
