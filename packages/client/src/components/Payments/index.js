import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "../Styled/Button";
import { config, theme } from "../../config";

export const Checkout = ({ price, label = "Pay Now", text = "Pay Now" }) => {
  const priceForStripe = price * 100;

  const onToken = (token) => {
    console.log(token);
    alert("Payment Succesful!");
  };

  return (
    <StripeCheckout
      label={label}
      name="Idea Camels"
      billingAddress
      shippingAddress
      image={theme.logos.main001}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel={label}
      token={onToken}
      stripeKey={config.payments.publishableKey}
    >
      <Button primary>{text}</Button>
    </StripeCheckout>
  );
};
