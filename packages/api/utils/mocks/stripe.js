// https://stripe.com/docs/api/customers/retrieve?lang=node
const customer = {
    "id": "cus_LdFlsJR7xPjZjY",
    "object": "customer",
    "address": null,
    "balance": 0,
    "created": 1651736267,
    "currency": "gbp",
    "default_source": null,
    "delinquent": false,
    "description": null,
    "discount": null,
    "email": null,
    "invoice_prefix": "14158D9",
    "invoice_settings": {
      "custom_fields": null,
      "default_payment_method": null,
      "footer": null
    },
    "livemode": false,
    "metadata": {},
    "name": null,
    "phone": null,
    "preferred_locales": [],
    "shipping": null,
    "tax_exempt": "none",
    "test_clock": null
  }

  // https://stripe.com/docs/api/charges/create
  const charge = {
    "id": "ch_3KbVCpIWny9rFbsQ0zkwvqiA",
    "object": "charge",
    "amount": 2000,
    "amount_captured": 2800,
    "amount_refunded": 0,
    "application": null,
    "application_fee": null,
    "application_fee_amount": null,
    "balance_transaction": "txn_1Kbx6sIWny9rFbsQbOBOnG5a",
    "billing_details": {
      "address": {
        "city": null,
        "country": null,
        "line1": null,
        "line2": null,
        "postal_code": "21312",
        "state": null
      },
      "email": null,
      "name": null,
      "phone": null
    },
    "calculated_statement_descriptor": "IDEACAMELS.COM",
    "captured": true,
    "created": 1646854195,
    "currency": "gbp",
    "customer": "cus_LHJNX3mzuGxkul",
    "description": "My First Test Charge (created for API docs)",
    "disputed": false,
    "failure_balance_transaction": null,
    "failure_code": null,
    "failure_message": null,
    "fraud_details": {},
    "invoice": null,
    "livemode": false,
    "metadata": {
      "last_charged_by_caller": "a1hxfpq17k",
      "account_ref": "1"
    },
    "on_behalf_of": null,
    "order": null,
    "outcome": {
      "network_status": "approved_by_network",
      "reason": null,
      "risk_level": "normal",
      "risk_score": 48,
      "seller_message": "Payment complete.",
      "type": "authorized"
    },
    "paid": true,
    "payment_intent": null,
    "payment_method": "card_1Kb6ynIWny9rFbsQXlJnT88K",
    "payment_method_details": {
      "card": {
        "brand": "visa",
        "checks": {
          "address_line1_check": null,
          "address_postal_code_check": "pass",
          "cvc_check": null
        },
        "country": "US",
        "exp_month": 12,
        "exp_year": 2033,
        "fingerprint": "GAtt4QXZkyT9P5YN",
        "funding": "debit",
        "installments": null,
        "last4": "5556",
        "mandate": null,
        "network": "visa",
        "three_d_secure": null,
        "wallet": null
      },
      "type": "card"
    },
    "receipt_email": null,
    "receipt_number": null,
    "receipt_url": "https://pay.stripe.com/receipts/acct_1KXMllIWny9rFbsQ/ch_3KbVCpIWny9rFbsQ0zkwvqiA/rcpt_LI5NxBUuZUPWQ1MepkP45fUgo4brCGw",
    "refunded": false,
    "refunds": {
      "object": "list",
      "data": [],
      "has_more": false,
      "url": "/v1/charges/ch_3KbVCpIWny9rFbsQ0zkwvqiA/refunds"
    },
    "review": null,
    "shipping": null,
    "source_transfer": null,
    "statement_descriptor": null,
    "statement_descriptor_suffix": null,
    "status": "succeeded",
    "transfer_data": null,
    "transfer_group": null,
    "source": "tok_amex"
  }

  // https://stripe.com/docs/api/cards/retrieve
const card = {
    "id": "card_1KvzKBIWny9rFbsQ1QUKQbjA",
    "object": "card",
    "address_city": null,
    "address_country": null,
    "address_line1": null,
    "address_line1_check": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null,
    "address_zip_check": null,
    "brand": "Visa",
    "country": "US",
    "customer": "cus_LdFpB3V0cCOGDK",
    "cvc_check": "pass",
    "dynamic_last4": null,
    "exp_month": 8,
    "exp_year": 2023,
    "fingerprint": "7PWkN38TtqV9sKf1",
    "funding": "credit",
    "last4": "4242",
    "metadata": {},
    "name": null,
    "tokenization_method": null
  }

  module.exports = {
      customer,
      charge,
      card
  }