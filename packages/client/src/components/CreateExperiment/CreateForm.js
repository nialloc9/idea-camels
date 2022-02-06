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
import { validateRequired, validateDomain } from "../../utils/form";
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

  calculatePrice = (value) => {
    const {
      domains,
      values: { domain },
      domainPrices,
    } = this.props;

    const isDomainAlreadyOwned = domains.find(({ name }) => name === value)
      ? true
      : false;

    if (!value || isDomainAlreadyOwned) return 0;

    const { price } = domainPrices.find(({ name }) => value.includes(name));

    return price;
  };

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

  render() {
    const {
      submitting,
      pristine,
      isFetchTemplatesLoading,
      submitError,
      values: { budget, domain },
      newExperiment: { templateRef, themeRef },
      onSubmit,
    } = this.props;

    const { domainError, domains } = this.state;

    const domainPrice = this.calculatePrice(domain);

    return (
      <Segment padded>
        <Form error={submitError} onSubmit={onSubmit}>
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
                    info="This is the budget that will be spent on driving traffic to your experiment."
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
                        <TableCell>{domainPrice}</TableCell>
                        <TableCell>{budget}</TableCell>
                        <TableCell>
                          {20 +
                            (parseInt(domainPrice) || 0) +
                            (parseInt(budget) || 0)}
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
    domain: { data: domains, suggestedDomains, prices },
  }) => ({
    newExperiment,
    domains,
    suggestedDomains,
    domainPrices: prices,
  }),
  { onSubmit: onPrepareExperiment }
)(withForm(CreateForm));
