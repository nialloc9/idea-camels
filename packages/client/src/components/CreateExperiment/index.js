import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Form } from "../Form/Form";
import { FormDropdown } from "../Form/Dropdown";
import { Message } from "../Message";
import { ListHeader, List, ListItem } from "../List";
import { withForm } from "../../hoc/withForm";
import { toTitleCase } from "../../utils/utils";
import { validateRequired, validateDomain } from "../../utils/form";
import { onSetExperiment } from "../../store/actions/experiment";
import { connect } from "../../store";

class CreateExperiment extends Component {
  constructor(props) {
    super(props);

    const { domains } = this.props;

    this.state = {
      domains: this.mapDomains(domains.map(({ name }) => name)),
      domainError: undefined,
      domainPrice: undefined,
    };
  }

  static defaultProps = {
    domains: [],
    domainPrices: [],
    templates: [],
    suggestedDomains: [],
  };

  get templateOptions() {
    const { templates = [] } = this.props;

    return templates.map(({ name, template_ref }) => ({
      key: template_ref,
      text: toTitleCase(`${name} Template`),
      value: template_ref,
    }));
  }

  get themeOptions() {
    const {
      templates = [],
      values: { templateRef },
    } = this.props;

    return templates.reduce(
      (total, { theme_name, theme_ref, template_ref }) => {
        if (template_ref === templateRef)
          total.push({
            key: theme_ref,
            value: theme_ref,
            text: toTitleCase(`${theme_name} Theme`),
          });

        return total;
      },
      []
    );
  }

  createDomainValue = (o) => ({ key: o, text: o, value: o });

  createDomainValue = (o) => ({ key: o, text: o, value: o });

  mapDomains = (domains) => domains.map((o) => this.createDomainValue(o));

  includesDomain = () => {
    const {
      domains,
      values: { domain },
    } = this.props;

    return domains.find(({ name }) => name === domain) ? true : false;
  };

  handleAddDomain = (e, { value }) => {
    const { domains } = this.state;

    const { domainPrices } = this.props;

    const domainError = validateDomain(value);

    const newState = {
      domainError,
      domains: domainError
        ? domains
        : [this.createDomainValue(value), ...domains],
    };

    const { price } = domainPrices.find(({ name }) => value.includes(name));

    newState.domainPrice = price;

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
      values: { domain },
      newExperiment: { templateRef, themeRef },
      onSubmit,
    } = this.props;

    const { domainError, domainPrice, domains } = this.state;

    return (
      <Form error={submitError} onSubmit={onSubmit}>
        <Grid container centered stackable>
          <GridRow centered columns={2}>
            <GridColumn>
              <FormDropdown
                search
                selection
                fluid
                allowAdditions
                label={
                  domainPrice && !this.includesDomain() ? (
                    <div
                      style={{ color: "red" }}
                    >{`Domain (Warning: You will be charged $${domainPrice} for purchase of new domain ${domain})`}</div>
                  ) : (
                    "Domain"
                  )
                }
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

          <GridRow>
            <GridColumn>
              <Button disabled={submitting || pristine} isLoading={submitting}>
                Create
              </Button>
            </GridColumn>
          </GridRow>
        </Grid>
      </Form>
    );
  }
}

export default connect(
  ({
    experiment: { newExperiment, templates },
    domain: { data: domains, suggestedDomains, prices },
  }) => ({
    newExperiment,
    templates,
    domains,
    suggestedDomains,
    domainPrices: prices,
  }),
  { onSubmit: onSetExperiment }
)(withForm(CreateExperiment));
