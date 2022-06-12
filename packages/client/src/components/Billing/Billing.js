import React, { Component, Fragment } from "react";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import { Header } from "../Styled/Header";
import { connect } from "../../store";
import { onAddNewCard } from "../../store/actions/account";

class Billing extends Component {
  constructor(props) {
    super(props);

    const { card = {} } = props;

    this.state = { index: !card?.id ? 0 : 1 };
  }

  render() {
    const { index } = this.state;
    const {
      isAddCardLoading,
      addCardErrorMessage,
      card = {},
      onAddCard,
    } = this.props;

    const { last4, exp_month, exp_year, brand } = card;

    const expiry = exp_month && `${exp_month}/${exp_year}`;

    return (
      <Fragment>
        <Header>Billing</Header>
        {index === 0 ? (
          <AddCard
            isLoading={isAddCardLoading}
            errorMessage={addCardErrorMessage}
            onSubmit={onAddCard}
            showCancelButton={!!card.id}
            onCancel={() => this.setState({ index: 1 })}
          />
        ) : (
          <Card
            last4Digits={last4}
            brand={brand}
            expiry={expiry}
            onClick={() => this.setState({ index: 0 })}
          />
        )}
      </Fragment>
    );
  }
}

export default connect(
  ({ account: { card, isAddCardLoading, addCardErrorMessage } }) => ({
    card,
    isAddCardLoading,
    addCardErrorMessage,
  }),
  { onAddCard: onAddNewCard }
)(Billing);
