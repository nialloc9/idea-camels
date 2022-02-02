import React, { Component } from "react";
import { Grid, GridRow } from "../components/Grid";
import { FormWizard } from "../components/Form/FormWizard";
import { CreateForm, Template } from "../components/CreateExperiment";
import { Block } from "../components/Styled/Block";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import {
  onFetch as onFetchDomains,
  onFetchDomainPrices,
} from "../store/actions/domain";
import { connect } from "../store";

class CreateExperiment extends Component {
  get forms() {
    return [
      {
        form: CreateForm,
        index: 0,
        props: {},
      },
      {
        form: Template,
        index: 1,
        props: {},
      },
    ];
  }

  componentDidMount() {
    const { onFetchDomains, onFetchDomainPrices } = this.props;

    onFetchDomains();
    onFetchDomainPrices();
  }

  render() {
    const { formIndex } = this.props;

    return (
      <Block minHeight={remCalc(500)}>
        <Grid padded centered stackable>
          <GridRow columns={6}>
            <FormWizard index={formIndex} forms={this.forms} />
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
  onFetchDomains,
  onFetchDomainPrices,
})(withPageAnalytics(CreateExperiment));
