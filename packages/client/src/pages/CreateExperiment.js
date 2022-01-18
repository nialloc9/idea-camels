import React, { Component } from "react";
import { Grid, GridRow } from "../components/Grid";
import { Segment } from "../components/Styled/Segment";
import { FormWizard } from "../components/Form/FormWizard";
import CreateForm from "../components/CreateExperiment";
import { Block } from "../components/Styled/Block";
import Default from "../templates/1";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import {
  onFetchTemplates,
  onSetExperiment,
  onCreate,
} from "../store/actions/experiment";
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
      // {
      //   form: this.renderTemplate(),
      //   index: 3,
      //   props: {}
      // }
    ];
  }
  componentDidMount() {
    const {
      onFetchTemplates,
      onFetchDomains,
      onFetchDomainPrices,
    } = this.props;

    onFetchTemplates();
    onFetchDomains();
    onFetchDomainPrices();
  }

  renderTemplate = () => {
    const {
      newExperiment: { templateRef = 1, content, theme },
      onSetExperiment,
    } = this.props;

    if ([templateRef, content, theme].some((o) => !o)) return null;

    const Component = {
      1: Default,
    }[templateRef];

    return (
      <Segment padded maxHeight={remCalc(700)} overflow="hidden auto">
        <Component
          theme={theme}
          content={content}
          onSetExperiment={onSetExperiment}
        />
      </Segment>
    );
  };

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
  onFetchTemplates,
  onSetExperiment,
  onCreate,
  onFetchDomains,
  onFetchDomainPrices,
})(withPageAnalytics(CreateExperiment));
