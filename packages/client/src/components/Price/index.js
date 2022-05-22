import React, { Fragment } from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "../Styled/Table";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Button } from "../Styled/Button";
import { Header } from "../Styled/Header";
import { Segment } from "../Styled/Segment";
import { config } from "../../config";

export default function Price({
  heading = "Cost",
  serviceFee = config.payments.serviceCharge,
  domainFee,
  adBudget,
  total,
  shouldShowButton = false,
  disabled,
  isLoading,
  action,
  onClick,
}) {
  return (
    <Segment padded>
      <Header textAlign="left">{heading}</Header>
      <Grid centered stackable>
        <GridRow centered columns={1}>
          <GridColumn>
            <Table celled padded textAlign="center" verticalAlign="middle">
              <TableHeader>
                <TableHeaderCell>Service Fee ($)</TableHeaderCell>
                <TableHeaderCell>Domain Fee ($)</TableHeaderCell>
                <TableHeaderCell>Ad budget ($)</TableHeaderCell>
                <TableHeaderCell>Total ($)</TableHeaderCell>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{serviceFee}</TableCell>
                  <TableCell>{domainFee}</TableCell>
                  <TableCell>{adBudget}</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </GridColumn>
        </GridRow>
        {shouldShowButton && (
          <GridRow>
            <GridColumn>
              <Button
                positive
                disabled={disabled}
                isLoading={isLoading}
                action={action}
                onClick={onClick}
              >
                Next
              </Button>
            </GridColumn>
          </GridRow>
        )}
      </Grid>
    </Segment>
  );
}
