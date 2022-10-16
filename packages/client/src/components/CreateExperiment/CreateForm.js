import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Divider } from "../Divider";
import { Button } from "../Styled/Button";
import { Segment } from "../Styled/Segment";
import { Header } from "../Styled/Header";
import { Form } from "../Form/Form";
import { FormInput } from "../Form/Input";
import { Message } from "../Message";
import Price from "../Price";
import { ListHeader, List, ListItem } from "../List";
import { withForm } from "../../hoc/withForm";
import { getWeeksFromNow, getDateMonthsFromNow } from "../../utils/utils";
import {
  calculateDomainPrice,
  calculateTotalExperimentPrice,
} from "../../utils/payments";
import {
  validateRequired,
  validateDomain,
  validateMaxLength,
  validateSpecialChars,
  validateMinValue,
} from "../../utils/form";
import {
  onPrepareExperiment,
  onResetDomain,
} from "../../store/actions/experiment";
import { connect } from "../../store";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    const {
      values: { domain },
    } = props;

    this.state = {
      domainPrice: undefined,
      keywordsIndex: 1,
      domainIndex: domain ? 0 : 1,
    };
  }

  static defaultProps = {
    domainPrices: [],
    suggestedDomains: [],
  };

  createDomainValue = (o) => ({ key: o, text: o, value: o });

  createDomainValue = (o) => ({ key: o, text: o, value: o });

  renderSuggestDomains = () => {
    const { suggestedDomains = [] } = this.props;

    if (suggestedDomains.length === 0) return null;

    return (
      <Message>
        <ListHeader>Suggested Domain</ListHeader>
        <List bulleted>
          {suggestedDomains.map(({ DomainName }) => (
            <ListItem key={DomainName}>{DomainName}</ListItem>
          ))}
        </List>
      </Message>
    );
  };

  setDomainIndex = (domainIndex) => {
    const { onResetDomain } = this.props;
    onResetDomain();
    this.setState({ domainIndex });
  };

  renderDomainSelection = () => {
    const { domainIndex } = this.state;
    const { domainPrices } = this.props;

    if (domainIndex === 0) {
      return (
        <GridColumn>
          <FormInput
            fluid
            type="text"
            labelText="Domain"
            action="create-experiment-form-click"
            label="create-free-domain-button"
            name="domain"
            display="block"
            tabletDisplay="inline-block"
            info="This will purchase a new domain for you."
            placeholder="Please add a domain to purchase for your experiment"
            validate={[
              validateRequired,
              validateDomain,
              (value) =>
                calculateDomainPrice({
                  domain: value,
                  domainPrices,
                }) === 0
                  ? "Domain Unavailable"
                  : undefined,
            ]}
          />
          <Button
            icon="recycle"
            primary
            content="Use free domain"
            onClick={() => this.setDomainIndex(1)}
            type="button"
            action="create-experiment-form-click"
            label="create-free-domain-button"
          />
          {this.renderSuggestDomains()}
        </GridColumn>
      );
    }

    return (
      <GridColumn>
        <FormInput
          fluid
          type="text"
          labelText="Domain"
          action="create-experiment-form-click"
          label="custom-domain"
          semanticProps={{
            label: {
              basic: true,
              content: ".ideacamels.com",
            },
            labelPosition: "right",
          }}
          name="subDomain"
          display="block"
          tabletDisplay="inline-block"
          placeholder="Please add a domain name for your experiment"
          info="This is a free domain. If you wish to have your own custom domain please click button below."
          validate={[
            validateRequired,
            validateSpecialChars,
            (value) =>
              [
                "www",
                "static",
                "dev",
                "staging",
                "prod",
                "develop",
                "development",
                "stage",
                "production",
              ].find((o) => o === value)
                ? "Reserved Domain"
                : undefined,
          ]}
        />
        <Button
          icon="add to cart"
          primary
          content="Purchase custom domain"
          onClick={() => this.setDomainIndex(0)}
          type="button"
          action="create-experiment-form-click"
          label="purchase-custom-button"
        />
      </GridColumn>
    );
  };

  hasMaxKeywords = () => this.state.keywordsIndex.length >= 3;

  handleAddKeywords = () =>
    this.setState(({ keywordsIndex }) => ({
      keywordsIndex: this.hasMaxKeywords() ? keywordsIndex : keywordsIndex + 1,
    }));

  render() {
    const {
      submitting,
      pristine,
      submitErrors = {},
      values: { budget, domain, subDomain },
      newExperiment,
      domainPrices,
      onSubmit,
    } = this.props;

    const { keywordsIndex } = this.state;
    console.log(this.props);
    return (
      <Segment padded>
        <Form
          initialValues={newExperiment}
          error={
            submitErrors["headline"] ||
            submitErrors["description"] ||
            submitErrors["keyword1"]
          }
          onSubmit={onSubmit}
        >
          <Segment padded>
            <Header textAlign="left">Experiment</Header>
            <Grid container centered stackable>
              <GridRow centered columns={2}>
                {this.renderDomainSelection()}
                <GridColumn />
              </GridRow>
            </Grid>
          </Segment>

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
                    placeholder="Please type a headline for your experiment"
                    info="This will be used as the headline for your ads run in this experiment so make it snappy."
                    validate={[validateRequired, validateMaxLength(25)]}
                    action="create-experiment-form-click"
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
                    placeholder="Please type a second headline for your experiment"
                    info="This will appear below your main headline for your ads run in this experiment."
                    validate={[validateRequired, validateMaxLength(25)]}
                    action="create-experiment-form-click"
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
                    placeholder="Please type a third headline for your experiment"
                    info="This will appear below your main headline for your ads run in this experiment."
                    validate={[validateRequired, validateMaxLength(25)]}
                    action="create-experiment-form-click"
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
                    placeholder="Please type a description for your experiment"
                    info="This will be used as the description for your ads run in this experiment. It will appear underneath your headline."
                    validate={[validateRequired, validateMaxLength(35)]}
                    action="create-experiment-form-click"
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
                    placeholder="Please type a second description for your experiment"
                    info="This will also be used as the description for your ads run in this experiment. It will appear underneath your headline."
                    validate={[validateRequired, validateMaxLength(35)]}
                    action="create-experiment-form-click"
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
                    info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your experiment should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                    validate={[
                      validateRequired,
                      validateMaxLength(80),
                      validateSpecialChars,
                    ]}
                    action="create-experiment-form-click"
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
                    info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your experiment should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                    validate={[
                      validateRequired,
                      validateMaxLength(80),
                      validateSpecialChars,
                    ]}
                    action="create-experiment-form-click"
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
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your experiment should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-experiment-form-click"
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
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your experiment should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-experiment-form-click"
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
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your experiment should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-experiment-form-click"
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
                      info="This is the inital keyword or combination of keywords a customer may search for in a search engine that your experiment should display for. Don't worry though, IdeaCamels will automatically change and optimise these for you using AI to predict the best keywords to bid on."
                      validate={[validateMaxLength(80), validateSpecialChars]}
                      action="create-experiment-form-click"
                      label="keyword-6"
                    />
                  </GridColumn>
                </GridRow>
              )}

              {keywordsIndex !== 3 && (
                <GridRow columns={1}>
                  <GridColumn>
                    <Button
                      display="left"
                      icon="plus"
                      action="create-experiment-form-click"
                      label="add-keywords"
                      onClick={this.handleAddKeywords}
                      type="button"
                    />
                  </GridColumn>
                </GridRow>
              )}
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
                    placeholder="When do you wish experiment to end?"
                    validate={[validateRequired]}
                    min={getWeeksFromNow(2).toISOString().split("T")[0]}
                    max={getDateMonthsFromNow(6).toISOString().split("T")[0]}
                    action="create-experiment-form-click"
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
                    info="This is the budget that will be spent on driving traffic to your experiment. We recommend using at least $50 to ensure you buy enough ads to get meaningful click throughs."
                    validate={[validateRequired, validateMinValue(20)]}
                    action="create-experiment-form-click"
                    label="budget"
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>

          <Price
            shouldShowButton
            domainFee={calculateDomainPrice({
              subDomain,
              domain,
              domainPrices,
            })}
            adBudget={budget || 0}
            total={calculateTotalExperimentPrice({
              domain,
              domainPrices,
              budget,
            })}
            action="create-experiment-form-1-submit-click"
            disabled={submitting || pristine}
            isLoading={submitting}
            onClick={onSubmit}
          />
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({ experiment: { newExperiment }, domain: { suggested, prices } }) => ({
    newExperiment,
    suggestedDomains: suggested,
    domainPrices: prices,
    initialValues: newExperiment,
  }),
  { onSubmit: onPrepareExperiment, onResetDomain }
)(withForm(CreateForm));
