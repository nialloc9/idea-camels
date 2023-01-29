import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Segment } from "../Styled/Segment";
import { Header } from "../Styled/Header";
import { Message } from "../Message";
import { Dropdown } from "../Styled/Dropdown";
import withAnalytics from "../../hoc/withAnalytics";
import Billing from "../Billing";
import Domain from "./Domain";
import withModal from "../../hoc/withModal";
import Default from "../../templates/IdeaCamelsDefault";
import Crm from "../../templates/Crm";
import { remCalc } from "../../utils/style";
import { onSetNewExperiment, onCreate } from "../../store/actions/experiment";
import { connect } from "../../store";
import { toTitleCase } from "../../utils/utils";
import templates, { findTemplate } from "../../templates";
import { history } from "../../store/middleware/history";

const BillingModal = withModal(Billing);

const AnalyticsDropDown = withAnalytics(Dropdown);

class CreateForm extends Component {
  get templateOptions() {
    return templates.map(({ config: { name, ref } }) => ({
      key: ref,
      text: toTitleCase(name),
      value: ref,
    }));
  }

  get themeOptions() {
    const {
      newExperiment: { templateRef },
    } = this.props;

    const template = findTemplate(templateRef);

    if (!template) return [];

    const {
      config: { themes },
    } = template;

    return themes.map(({ name, ref }) => ({
      key: ref,
      value: ref,
      text: toTitleCase(name),
    }));
  }

  renderStyleSelect = () => {
    const {
      isFetchTemplatesLoading,
      newExperiment: { domain, subDomain, templateRef, themeRef },
      onSetNewExperiment,
    } = this.props;

    if (!domain && !subDomain) return null;

    return (
      <Segment padded>
        <Header textAlign="left">2. Set Landing Page Style</Header>
        <Grid container centered stackable>
          <GridRow centered columns={2}>
            <GridColumn>
              <AnalyticsDropDown
                fluid
                lazyLoad
                labeled
                selection
                search
                labelText="Template"
                name="templateRef"
                value={templateRef}
                display="block"
                action="edit-experiment-form-click"
                label="template"
                tabletDisplay="inline-block"
                options={this.templateOptions}
                placeholder="Please select a template"
                loading={isFetchTemplatesLoading}
                onChange={(e, { value }) =>
                  onSetNewExperiment({
                    templateRef: value,
                    themeRef: 1,
                  })
                }
              />
            </GridColumn>
            <GridColumn>
              <AnalyticsDropDown
                labelText="Theme"
                name="themeRef"
                value={themeRef}
                lazyLoad
                selection
                display="block"
                action="edit-experiment-form-click"
                label="theme"
                tabletDisplay="inline-block"
                options={this.themeOptions}
                disabled={this.themeOptions.length === 0}
                placeholder="Please select a theme"
                loading={isFetchTemplatesLoading}
                fluid
                onChange={(e, { value }) =>
                  onSetNewExperiment({
                    themeRef: value,
                  })
                }
              />
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    );
  };

  renderTemplate = () => {
    const {
      newExperiment: { domain, subDomain, templateRef, theme, content },
      onSetNewExperiment,
    } = this.props;
    if ([domain || subDomain, content, theme].some((o) => !o)) return null;

    const Component = {
      1: Default,
      2: Crm,
    }[templateRef];

    return (
      <Segment padded maxHeight={remCalc(900)} overflow="hidden auto">
        <Header textAlign="left">3. Edit Landing Page Content</Header>
        <Component
          theme={theme}
          content={content}
          onSetExperiment={onSetNewExperiment}
        />
      </Segment>
    );
  };

  renderControls = () => {
    const {
      hasValidCard,
      isCreateLoading,
      createErrorMessage,
      newExperiment: { domain, subDomain, templateRef },
      onCreate,
    } = this.props;

    if ([domain || subDomain, templateRef].some((o) => !o)) return null;

    return (
      <Segment>
        <Header textAlign="left">4. Deploy Experiment</Header>
        {hasValidCard || (!domain && !!subDomain) ? (
          <Button
            textAlign="left"
            positive
            disabled={isCreateLoading}
            loading={isCreateLoading}
            action="create-experiment-form-2-submit-click"
            onClick={() =>
              onCreate((experiment) =>
                history.push(
                  `/home?experiment_ref=${experiment.experiment_ref}`
                )
              )
            }
          >
            Create Experiment
          </Button>
        ) : (
          <BillingModal buttonText="Add Card" modalHeaderText="Add Card" />
        )}

        {createErrorMessage && <Message error>{createErrorMessage}</Message>}
      </Segment>
    );
  };

  render() {
    return (
      <Segment>
        <Domain />
        {this.renderStyleSelect()}
        {this.renderTemplate()}
        {this.renderControls()}
      </Segment>
    );
  }
}

export default connect(
  ({
    experiment: { createErrorMessage, newExperiment },
    domain: { suggested, prices },
    account: { card: { id } = {} },
  }) => ({
    createErrorMessage,
    newExperiment,
    suggestedDomains: suggested,
    domainPrices: prices,
    hasValidCard: !!id,
  }),
  {
    onCreate,
    onSetNewExperiment,
  }
)(CreateForm);
