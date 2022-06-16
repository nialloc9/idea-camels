import React from "react";
import {
  ElementsConsumer,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Grid, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Message } from "../Styled/Message";
import { config } from "../../config";

const stripePromise = loadStripe(config.payments.publishableKey);

class CheckoutForm extends React.Component {
  state = {
    isLoading: false,
    errorMessage: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { stripe, elements, onSubmit } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      this.setState({ errorMessage: result.error.message });
    } else {
      onSubmit(result.token);
    }

    this.setState({ isLoading: false });
  };

  render() {
    const {
      showCancelButton,
      stripe,
      isLoading: isSubmitLoading,
      errorMessage: submitErrorMessage,
      onCancel,
    } = this.props;
    const { isLoading, errorMessage } = this.state;

    const error = errorMessage || submitErrorMessage;

    const loading = [!stripe, isLoading, isSubmitLoading].some((o) => o);

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid padded columns={1}>
          <GridColumn>
            <CardElement />
          </GridColumn>
          <GridColumn>
            {showCancelButton && (
              <Button
                action="add-card-form-click"
                label="cancel"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              primary
              disabled={loading}
              loading={loading}
              action="add-card-form-click"
              label="add-card"
              onClick={this.handleSubmit}
            >
              Add Card
            </Button>
          </GridColumn>
          {error && (
            <GridColumn>
              <Message error>{error}</Message>
            </GridColumn>
          )}
        </Grid>
      </form>
    );
  }
}

export const AddCard = ({
  showCancelButton,
  isLoading,
  errorMessage,
  onSubmit,
  onCancel,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm
            isLoading={isLoading}
            showCancelButton={showCancelButton}
            errorMessage={errorMessage}
            stripe={stripe}
            elements={elements}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        )}
      </ElementsConsumer>
    </Elements>
  );
};
