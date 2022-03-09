import React from "react";
import { Grid, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Icon } from "../Styled/Icon";

export const Card = ({ last4Digits, brand, expiry, onClick }) => {
  const icon =
    {
      amex: "cc amex",
      visa: "cc visa",
      mastercard: "cc mastercard",
      discovery: "cc discover",
    }[brand.toLowerCase()] || "credit card";

  return (
    <Grid padded columns={2}>
      <GridColumn>
        <Icon name={icon} />
        {` ***********${last4Digits}`}
      </GridColumn>
      <GridColumn>{expiry}</GridColumn>
      <GridColumn>
        <Button primary onClick={onClick}>
          Update
        </Button>
      </GridColumn>
    </Grid>
  );
};
