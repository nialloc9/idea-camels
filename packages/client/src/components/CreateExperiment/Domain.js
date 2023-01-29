import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Segment } from "../Styled/Segment";
import { Header } from "../Styled/Header";
import { Form } from "../Form/Form";
import { FormInput } from "../Form/Input";
import { Message } from "../Message";
import { ListHeader, List, ListItem } from "../List";
import { withForm } from "../../hoc/withForm";
import { calculateDomainPrice } from "../../utils/payments";
import {
  validateRequired,
  validateDomain,
  validateSpecialChars,
} from "../../utils/form";
import {
  onSetNewExperiment,
  onResetDomain,
} from "../../store/actions/experiment";
import { connect } from "../../store";

class CreateForm extends Component {
  constructor(props) {
    super(props);
    const {
      newExperiment: { domain },
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
    const { domainPrices, pristine, loading } = this.props;

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
          <Button
            icon="save"
            type="submit"
            action="create-experiment-form-click"
            label="save-custom-domain"
            positive
            disabled={pristine || loading}
          >
            Save
          </Button>
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
        <Button
          icon="save"
          type="submit"
          action="create-experiment-form-click"
          label="save-sub-domain"
          content="Save"
          positive
          disabled={pristine || loading}
          loading={loading}
        />
      </GridColumn>
    );
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <Segment padded>
        <Form onSubmit={onSubmit}>
          <Header textAlign="left">1. Set Experiment Details</Header>
          <Grid container centered stackable>
            <GridRow centered columns={2}>
              {this.renderDomainSelection()}
              <GridColumn />
            </GridRow>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({ experiment: { newExperiment }, domain: { suggested, prices } }) => ({
    initialValues: {
      domain: newExperiment.domain,
      subDomain: newExperiment.subDomain,
    },
    newExperiment,
    suggestedDomains: suggested,
    domainPrices: prices,
  }),
  {
    onSubmit: onSetNewExperiment,
    onResetDomain,
  }
)(withForm(CreateForm));
