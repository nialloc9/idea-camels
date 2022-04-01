import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Segment } from "../Styled/Segment";
import { Header } from "../Styled/Header";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "../Styled/Table";
import { Form } from "../Form/Form";
import { FormInput } from "../Form/Input";
import { FormDropdown } from "../Form/Dropdown";
import { Message } from "../Message";
import { ListHeader, List, ListItem } from "../List";
import { withForm } from "../../hoc/withForm";
import { toTitleCase } from "../../utils/utils";
import {
  calculateDomainPrice,
  calculateTotalExperimentPrice,
} from "../../utils/payments";
import {
  validateRequired,
  validateDomain,
  validateMaxLength,
} from "../../utils/form";
import { onPrepareExperiment } from "../../store/actions/experiment";
import { connect } from "../../store";
import templates, { findTemplate } from "../../templates";

class CreateForm extends Component {
  constructor(props) {
    super(props);

    const { domains } = this.props;

    this.state = {
      domainError: undefined,
      domainPrice: undefined,
      domains: this.mapDomains(domains.map(({ name }) => name)),
      keywordsIndex: 1,
    };
  }

  static defaultProps = {
    domains: [],
    domainPrices: [],
    suggestedDomains: [],
  };

  get templateOptions() {
    return templates.map(({ config: { name, ref } }) => ({
      key: ref,
      text: toTitleCase(`${name} Template`),
      value: ref,
    }));
  }

  get themeOptions() {
    const {
      values: { templateRef },
    } = this.props;

    const template = findTemplate(templateRef);

    if (!template) return [];

    const {
      config: { themes },
    } = template;

    return themes.map(({ name, ref }) => ({
      key: ref,
      value: ref,
      text: toTitleCase(`${name} Theme`),
    }));
  }

  createDomainValue = (o) => ({ key: o, text: o, value: o });

  createDomainValue = (o) => ({ key: o, text: o, value: o });

  mapDomains = (domains) => domains.map((o) => this.createDomainValue(o));

  handleAddDomain = (e, { value }) => {
    const { domains } = this.state;

    const domainError = validateDomain(value);

    const newState = {
      domainError,
      domains: domainError
        ? domains
        : [this.createDomainValue(value), ...domains],
    };

    this.setState(newState);
  };

  renderSuggestDomains = () => {
    const { suggestedDomains = [] } = this.props;

    if (suggestedDomains.length > 0) {
      return (
        <Message error>
          <ListHeader>Suggested Domain Names</ListHeader>
          <List>
            {suggestedDomains.map((o) => (
              <ListItem key={o}>{o}</ListItem>
            ))}
          </List>
        </Message>
      );
    }
  };

  hasMaxKeywords = () => this.state.keywordsIndex.length >= 3;

  handleAddKeywords = () =>
    this.setState(({ keywordsIndex }) => ({
      keywordsIndex: this.hasMaxKeywords() ? keywordsIndex : keywordsIndex + 1,
    }));

  render() {
    const {
      isFetcDomainsLoading,
      submitting,
      pristine,
      isFetchTemplatesLoading,
      submitError,
      values: { budget, domain },
      newExperiment,
      domainPrices,
      domains: ownedDomains,
      onSubmit,
    } = this.props;

    const { templateRef, themeRef } = newExperiment;

    const { domainError, domains, keywordsIndex } = this.state;

    return (
      <Segment padded>
        <Form
          error={submitError}
          initialValues={newExperiment}
          onSubmit={onSubmit}
        >
          <Segment padded>
            <Header textAlign="left">Experiment</Header>
            <Grid container centered stackable>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormDropdown
                    search
                    selection
                    fluid
                    allowAdditions
                    disabled={isFetcDomainsLoading}
                    loading={isFetcDomainsLoading}
                    info="Previously purchased domains will be available for future experiments for up to 1 year."
                    label="Domain"
                    name="domain"
                    customError={domainError}
                    validate={[validateRequired, validateDomain]}
                    options={domains}
                    onAddItem={this.handleAddDomain}
                  />
                  {this.renderSuggestDomains()}
                </GridColumn>
                <GridColumn>
                  <FormDropdown
                    label="Template"
                    name="templateRef"
                    lazyLoad
                    labeled
                    defaultValue={templateRef}
                    selection
                    search
                    display="block"
                    tabletDisplay="inline-block"
                    defaultValue={templateRef}
                    options={this.templateOptions}
                    placeholder="Please select a template"
                    loading={isFetchTemplatesLoading}
                    validate={[validateRequired]}
                  />
                </GridColumn>
              </GridRow>
              <GridRow centered columns={2}>
                <GridColumn>
                  <FormDropdown
                    label="Theme"
                    name="themeRef"
                    defaultValue={themeRef}
                    lazyLoad
                    selection
                    display="block"
                    tabletDisplay="inline-block"
                    options={this.themeOptions}
                    disabled={this.themeOptions.length === 0}
                    placeholder="Please select a theme"
                    loading={isFetchTemplatesLoading}
                    validate={[validateRequired]}
                  />
                </GridColumn>

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
                    label="Headline"
                    name="headline"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a headline for your experiment"
                    info="This will be used as the headline for your ads run in this experiment so make it snappy."
                    validate={[validateRequired, validateMaxLength(25)]}
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    label="Headline 2"
                    name="headline2"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a second headline for your experiment"
                    info="This will appear below your main headline for your ads run in this experiment."
                    validate={[validateRequired, validateMaxLength(25)]}
                  />
                </GridColumn>
              </GridRow>

              <GridRow centered columns={2}>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    label="Description"
                    name="description"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Please type a description for your experiment"
                    info="This will be used as the description for your ads run in this experiment. It will appear underneath your headline."
                    validate={[validateRequired, validateMaxLength(35)]}
                  />
                </GridColumn>
                <GridColumn />
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
                    label={`Keyword 1`}
                    name={`keyword1`}
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Keywords to check for in search engine"
                    info="This is the keyword or combination of keywords a customer may search for in a search engine that your experiment should display for."
                    validate={[validateRequired, validateMaxLength(80)]}
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="text"
                    label={`Keyword 2`}
                    name={`keyword2`}
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="Keywords to check for in search engine"
                    info="This is the keyword or combination of keywords a customer may search for in a search engine that your experiment should display for."
                    validate={[validateRequired, validateMaxLength(80)]}
                  />
                </GridColumn>
              </GridRow>
              {keywordsIndex >= 2 && (
                <GridRow centered columns={2}>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      label={`Keyword 3`}
                      name={`keyword3`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the keyword or combination of keywords a customer may search for in a search engine that your experiment should display for."
                      validate={[validateMaxLength(80)]}
                    />
                  </GridColumn>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      label={`Keyword 4`}
                      name={`keyword4`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the keyword or combination of keywords a customer may search for in a search engine that your experiment should display for."
                      validate={[validateMaxLength(80)]}
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
                      label={`Keyword 5`}
                      name={`keyword5`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the keyword or combination of keywords a customer may search for in a search engine that your experiment should display for."
                      validate={[validateMaxLength(80)]}
                    />
                  </GridColumn>
                  <GridColumn>
                    <FormInput
                      fluid
                      type="text"
                      label={`Keyword 6`}
                      name={`keyword6`}
                      display="block"
                      tabletDisplay="inline-block"
                      placeholder="Keywords to check for in search engine"
                      info="This is the keyword or combination of keywords a customer may search for in a search engine that your experiment should display for."
                      validate={[validateMaxLength(80)]}
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
                      action="add-keywords-click"
                      onClick={this.handleAddKeywords}
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
                    label="End Date"
                    name="endDate"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="When do you wish experiment to end?"
                    validate={[validateRequired]}
                  />
                </GridColumn>
                <GridColumn>
                  <FormInput
                    fluid
                    type="number"
                    label="Budget ($)"
                    name="budget"
                    display="block"
                    tabletDisplay="inline-block"
                    placeholder="How much do you wish to spend?"
                    info="This is the budget that will be spent on driving traffic to your experiment. We recommend using at least $100 to ensure you buy enough ads to get meaningful click throughs."
                    validate={[validateRequired]}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>

          <Segment padded>
            <Header textAlign="left">Cost</Header>
            <Grid container centered stackable>
              <GridRow centered columns={1}>
                <GridColumn>
                  <Table
                    celled
                    padded
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <TableHeader>
                      <TableHeaderCell>Service Fee ($)</TableHeaderCell>
                      <TableHeaderCell>Domain Fee ($)</TableHeaderCell>
                      <TableHeaderCell>Ad budget ($)</TableHeaderCell>
                      <TableHeaderCell>Total ($)</TableHeaderCell>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>20</TableCell>
                        <TableCell>
                          {calculateDomainPrice({
                            domain,
                            domains: ownedDomains,
                            domainPrices,
                          })}
                        </TableCell>
                        <TableCell>{budget}</TableCell>
                        <TableCell>
                          {calculateTotalExperimentPrice({
                            domain,
                            domains: ownedDomains,
                            domainPrices,
                            budget,
                          })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <Button
                    positive
                    disabled={submitting || pristine}
                    isLoading={submitting}
                    action="create-experiment-form-1-submit-click"
                    onClick={() => this.setState({ isConfirmOpen: true })}
                  >
                    Next
                  </Button>
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({
    experiment: { newExperiment },
    domain: { isFetchLoading, data: domains, suggestedDomains, prices },
  }) => {
    const selectedDomain = domains.find(
      ({ domain_ref }) => domain_ref === newExperiment.domainRef
    );

    const domain = selectedDomain && selectedDomain.name;

    return {
      isFetcDomainsLoading: isFetchLoading,
      newExperiment,
      domains,
      suggestedDomains,
      domainPrices: prices,
      initialValues: {
        ...newExperiment,
        domain,
      },
    };
  },
  { onSubmit: onPrepareExperiment }
)(withForm(CreateForm));
