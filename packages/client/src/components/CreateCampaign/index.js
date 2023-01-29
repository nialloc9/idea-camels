import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Divider } from "../Divider";
import { Button } from "../Styled/Button";
import { Segment } from "../Styled/Segment";
import { Header } from "../Styled/Header";
import { Form } from "../Form/Form";
import { FormInput } from "../Form/Input";
import { FormCheckbox } from "../Form/Checkbox";
import Billing from "../Billing";
import withModal from "../../hoc/withModal";
import { withForm } from "../../hoc/withForm";
import { getWeeksFromNow, getDateMonthsFromNow } from "../../utils/utils";
import {
  validateRequired,
  validateMaxLength,
  validateSpecialChars,
  validateMinValue,
} from "../../utils/form";
import { onCreate } from "../../store/actions/campaign";
import { connect } from "../../store";
import { getQueryParameterByName } from "../../utils/utils";
import { history } from "../../store/middleware/history";

const BillingModal = withModal(Billing);

class CreateForm extends Component {
  state = {
    keywordsIndex: 1,
  };

  get experimentRef() {
    return getQueryParameterByName("experiment_ref");
  }

  get experiment() {
    const { experiments } = this.props;

    if (!this.experimentRef) return {};

    return experiments.find(
      ({ experiment_ref }) => experiment_ref === parseInt(this.experimentRef)
    );
  }

  hasMaxKeywords = () => this.state.keywordsIndex.length >= 3;

  handleAddKeywords = () =>
    this.setState(({ keywordsIndex }) => ({
      keywordsIndex: this.hasMaxKeywords() ? keywordsIndex : keywordsIndex + 1,
    }));

  renderControls = () => {
    const { hasValidCard, isCreateLoading, submitting, pristine } = this.props;

    return (
      <Segment padded>
        {hasValidCard ? (
          <Button
            positive
            disabled={isCreateLoading || pristine || submitting}
            loading={isCreateLoading}
            action="create-campaign-form-submit-click"
            onClick={this.handleSubmit}
          >
            Create Campaign
          </Button>
        ) : (
          <BillingModal buttonText="Add Card" modalHeaderText="Add Card" />
        )}
      </Segment>
    );
  };

  handleSubmit = (formData) => {
    const { onSubmit } = this.props;

    return onSubmit(
      {
        ...formData,
        experimentRef: this.experimentRef,
      },
      history.push(`/home?experiment_ref=${this.experimentRef}`)
    );
  };

  render() {
    const {
      submitErrors = {},
      createErrorMessage,
      createSuccessMessage,
    } = this.props;

    const { keywordsIndex } = this.state;

    return (
      <Segment padded>
        <Form
          success={createSuccessMessage}
          error={
            submitErrors["headline"] ||
            submitErrors["description"] ||
            submitErrors["keyword1"] ||
            createErrorMessage
          }
          onSubmit={this.handleSubmit}
        >
          <Segment padded>
            <Header textAlign="left">Ad</Header>
            <Grid container centered stackable>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText="Headline"
                    name="headline"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a headline for your campaign"
                    info="This will be used as the headline for your ads run in this campaign so make it snappy."
                    validate={[validateRequired, validateMaxLength(25)]}
                    action="create-campaign-form-click"
                    label="headline"
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText="Headline 2"
                    name="headline2"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a second headline for your campaign"
                    info="This will appear below your main headline for your ads run in this campaign."
                    validate={[validateRequired, validateMaxLength(25)]}
                    action="create-campaign-form-click"
                    label="headline-2"
                  />
                </GridColumn>
              </GridRow>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText="Headline 3"
                    name="headline3"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a third headline for your campaign"
                    info="This will appear below your main headline for your ads run in this campaign."
                    validate={[validateRequired, validateMaxLength(25)]}
                    action="create-campaign-form-click"
                    label="headline-3"
                  />
                </GridColumn>
                <GridColumn />
              </GridRow>

              <GridRow columns={1}>
                <GridColumn>
                  <Divider />
                </GridColumn>
              </GridRow>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText="Description"
                    name="description"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a description for your campaign"
                    info="This will be used as the description for your ads run in this campaign. It will appear underneath your headline."
                    validate={[validateRequired, validateMaxLength(35)]}
                    action="create-campaign-form-click"
                    label="description"
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText="Description 2"
                    name="description2"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a second description for your campaign"
                    info="This will also be used as the description for your ads run in this campaign. It will appear underneath your headline."
                    validate={[validateRequired, validateMaxLength(35)]}
                    action="create-campaign-form-click"
                    label="description-2"
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>

          <Segment padded>
            <Header textAlign="left">Keywords</Header>
            <Grid container centered stackable>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText={`Keyword 1`}
                    name={`keyword1`}
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Keywords to check for in search engine"
                    info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your campaign should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                    validate={[
                      validateRequired,
                      validateMaxLength(80),
                      validateSpecialChars,
                    ]}
                    action="create-campaign-form-click"
                    label="keyword-1"
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    labelText={`Keyword 2`}
                    name={`keyword2`}
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Keywords to check for in search engine"
                    info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your campaign should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                    validate={[
                      validateRequired,
                      validateMaxLength(80),
                      validateSpecialChars,
                    ]}
                    action="create-campaign-form-click"
                    label="keyword-2"
                  />
                </GridColumn>
              </GridRow>
              {keywordsIndex >= 2 && (
                <GridRow centered columns={2}>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      labelText={`Keyword 3`}
                      name={`keyword3`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your campaign should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-campaign-form-click"
                      label="keyword-3"
                    />
                  </GridColumn>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      labelText={`Keyword 4`}
                      name={`keyword4`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your campaign should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-campaign-form-click"
                      label="keyword-4"
                    />
                  </GridColumn>
                </GridRow>
              )}
              {keywordsIndex >= 3 && (
                <GridRow centered columns={2}>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      labelText={`Keyword 5`}
                      name={`keyword5`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your campaign should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-campaign-form-click"
                      label="keyword-5"
                    />
                  </GridColumn>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      labelText={`Keyword 6`}
                      name={`keyword6`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your campaign should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-campaign-form-click"
                      label="keyword-6"
                    />
                  </GridColumn>
                </GridRow>
              )}

              <GridRow columns={2}>
                <GridColumn>
                  {keywordsIndex !== 3 && (
                    <Button
                      display="left"
                      icon="plus"
                      action="create-campaign-form-click"
                      label="add-keywords"
                      onClick={this.handleAddKeywords}
                      type="button"
                    />
                  )}
                </GridColumn>
                <GridColumn>
                  <FormCheckbox
                    labelText="Dynamic keyword optimisation"
                    name="keywordOptimise"
                    inlineLabel
                    defaultChecked
                    info="IdeaCamels uses AI to dynamically update your keywords each day to optimise bidding strategy. We recommend you keep this on."
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>

          <Segment padded>
            <Header textAlign="left">Budget</Header>
            <Grid container centered stackable>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormInput
                    fluid
                    type="date"
                    labelText="End Date"
                    name="endDate"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="When do you wish campaign to end?"
                    validate={[validateRequired]}
                    min={getWeeksFromNow(2).toISOString().split("T")[0]}
                    max={getDateMonthsFromNow(6).toISOString().split("T")[0]}
                    action="create-campaign-form-click"
                    label="end-date"
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="number"
                    labelText="Budget ($)"
                    name="budget"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="How much do you wish to spend?"
                    info="This is the budget that will be spent on driving traffic to your campaign. We recommend using $50 or more to ensure you buy enough ads to get meaningful click throughs."
                    validate={[validateRequired, validateMinValue(5)]}
                    action="create-campaign-form-click"
                    label="budget"
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
          {this.renderControls()}
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({
    account: { card },
    experiment: { data },
    campaign: { isCreateLoading, createSuccessMessage, createErrorMessage },
  }) => ({
    hasValidCard: !!card?.id,
    isCreateLoading,
    createSuccessMessage,
    createErrorMessage,
    experiments: data,
    initialValues: {
      keywordOptimise: true,
    },
  }),
  { onSubmit: onCreate }
)(withForm(CreateForm));
