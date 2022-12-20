import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Segment } from "../Styled/Segment";
import { Header } from "../Styled/Header";
import { Form } from "../Form/Form";
import { FormInput } from "../Form/Input";
import { Message } from "../Message";
import { ListHeader, List, ListItem } from "../List";
import { Dropdown } from "../Form/Dropdown";
import Billing from "../Billing";
import withModal from "../../hoc/withModal";
import Default from "../../templates/IdeaCamelsDefault";
import Crm from "../../templates/Crm";
import { withForm } from "../../hoc/withForm";
import { calculateDomainPrice } from "../../utils/payments";
import { remCalc } from "../../utils/style";
import {
  validateRequired,
  validateDomain,
  validateSpecialChars,
} from "../../utils/form";
import {
  onPrepareExperiment,
  onResetDomain,
  onSetNewExperiment,
} from "../../store/actions/experiment";
import { connect } from "../../store";
import { getWeeksFromNow, getDateMonthsFromNow } from "../../utils/utils";
import { toTitleCase } from "../../utils/utils";
import templates, { findTemplate } from "../../templates";
import { history } from "../../store/middleware/history";

const BillingModal = withModal(Billing);

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

  get templateOptions() {
    return templates.map(({ config: { name, ref } }) => ({
      key: ref,
      text: toTitleCase(name),
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
      text: toTitleCase(name),
    }));
  }

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
    const { domainPrices, onSubmit } = this.props;

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
            onChange={(value) => onSubmit({ domain: value })}
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
          onChange={(value) => onSubmit({ subDomain: value })}
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

  renderStyleSelect = () => {
    const {
      isFetchTemplatesLoading,
      newExperiment: { templateRef, themeRef, domain, subDomain, endDate },
      onSubmit,
    } = this.props;
    if ([domain || subDomain, endDate].some((o) => !o)) return null;

    return (
      <Segment>
        <Header textAlign="left">2. Set Landing Page Style</Header>
        <Grid container centered stackable>
          <GridRow centered columns={2}>
            <GridColumn>
              <Dropdown
                labelText="Template"
                name="templateRef"
                lazyLoad
                labeled
                defaultValue={templateRef}
                selection
                search
                display="block"
                action="edit-experiment-form-click"
                label="template"
                tabletDisplay="inline-block"
                options={this.templateOptions}
                placeholder="Please select a template"
                loading={isFetchTemplatesLoading}
                onChange={(value) =>
                  onSubmit({ templateRef: value, themeRef: 1 })
                }
              />
            </GridColumn>
            <GridColumn>
              <Dropdown
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
                onChange={(value) => onSubmit({ templateRef, themeRef: value })}
              />
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    );
  };

  renderTemplate = () => {
    const {
      newExperiment: { templateRef, theme, content },
    } = this.props;
    if ([templateRef, content, theme].some((o) => !o)) return null;

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
      onSubmit,
    } = this.props;
    return (
      <Segment padded>
        <Header textAlign="left">4. Deploy Experiment</Header>
        {hasValidCard ? (
          <Button
            textAlign="left"
            positive
            disabled={isCreateLoading}
            loading={isCreateLoading}
            action="create-experiment-form-2-submit-click"
            onClick={() =>
              onSubmit((experiment) =>
                history.push(
                  `/home?experiment_ref=${experiment.experiment_ref}`
                )
              )
            }
          >
            Create Experiment
          </Button>
        ) : (
          <BillingModal
            buttonSize="huge"
            buttonText="Add Card To Purchase Domain"
            modalHeaderText="Add Card"
          />
        )}

        {createErrorMessage && <Message error>{createErrorMessage}</Message>}
      </Segment>
    );
  };

  render() {
    const {
      submitting,
      pristine,
      isFetchTemplatesLoading,
      submitErrors = {},
      values: { budget, domain, subDomain },
      newExperiment,
      domainPrices,
      onSubmit,
    } = this.props;

    const { templateRef, themeRef, theme, content } = newExperiment;

    return (
      <Segment padded>
        <Form initialValues={newExperiment} onSubmit={onSubmit}>
          <Segment padded>
            <Header textAlign="left">1. Set Experiment Details</Header>
            <Grid container centered stackable>
              <GridRow centered columns={2}>
                {this.renderDomainSelection()}
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
                    min={getWeeksFromNow(4).toISOString().split("T")[0]}
                    max={getDateMonthsFromNow(6).toISOString().split("T")[0]}
                    action="create-experiment-form-click"
                    label="end-date"
                    info="Date to end experiment"
                    onChange={(value) => onSubmit({ endDate: value })}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
          {this.renderStyleSelect()}
          {this.renderTemplate()}
          {this.renderControls()}
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
  { onSubmit: onPrepareExperiment, onResetDomain, onSetNewExperiment }
)(withForm(CreateForm));
