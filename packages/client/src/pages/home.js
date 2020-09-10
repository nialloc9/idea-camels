import React, { Fragment } from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Segment } from "../components/Styled/Segment";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableBody,
} from "../components/Styled/Table";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PieChart } from "../components/PieChart";
import { Header } from "../components/Header";
import { Progress } from "../components/Progress";
import { Block } from "../components/Styled/Block";
import withPageAnalytics from "../hoc/withPageAnalytics";
import theme from "../config/theme";
import { remCalc } from "../utils/style";

const defaultKeywords = [
  {
    text: "Test my idea",
    estimatedCostPerClick: 1,
    estimatedDailyClicks: 12,
  },
  {
    text: "Is my idea good?",
    estimatedCostPerClick: 3,
    estimatedDailyClicks: 1,
  },
  {
    text: "Business idea",
    estimatedCostPerClick: 8,
    estimatedDailyClicks: 4,
  },
  {
    text: "Marketing idea",
    estimatedCostPerClick: 6,
    estimatedDailyClicks: 12,
  },
  {
    text: "Is my website idea good?",
    estimatedCostPerClick: 7,
    estimatedDailyClicks: 6,
  },
  {
    text: "Test my website idea cheaply",
    estimatedCostPerClick: 1,
    estimatedDailyClicks: 1,
  },
];

const renderCostRow = ({
  text,
  estimatedCostPerClick,
  estimatedDailyClicks,
}) => (
  <TableRow>
    <TableCell>{text}</TableCell>
    <TableCell>£{estimatedCostPerClick}</TableCell>
    <TableCell>{estimatedDailyClicks}</TableCell>
    <TableCell>£{estimatedCostPerClick * estimatedDailyClicks}</TableCell>
  </TableRow>
);

const totalCost = defaultKeywords.reduce(
  (total, { estimatedCostPerClick, estimatedDailyClicks }) =>
    total + estimatedCostPerClick * estimatedDailyClicks,
  0
);

const renderInputListItem = ({ text }) => (
  <ListItem key={`keywords-${text}`}>
    <Input fluid value={text} />
  </ListItem>
);

export default withPageAnalytics(() => (
  <Fragment>
    <Grid columns={2} padded centered stackable>
      <GridRow>
        <GridColumn>
          <Segment height="100%">
            <Segment>
              <Header>Metrics</Header>
              <Table basic="very" celled>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Number of clicks</TableHeaderCell>
                    <TableHeaderCell>Number of impressions</TableHeaderCell>
                    <TableHeaderCell>Number of emails gathered</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Segment>
            <Segment>
              <Header>Confirmed Interest</Header>
              <Table basic="very" celled>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>test@test.com</TableCell>
                    <TableCell>10/09/20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>test@test.com</TableCell>
                    <TableCell>10/09/20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>test@test.com</TableCell>
                    <TableCell>10/09/20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>test@test.com</TableCell>
                    <TableCell>10/09/20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>test@test.com</TableCell>
                    <TableCell>10/09/20</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Segment>
          </Segment>
        </GridColumn>
        <GridColumn>
          <Segment size="small" height="100%" textAlign="center">
            <PieChart
              width={remCalc(250)}
              data={[
                {
                  title: "Organic",
                  value: 10,
                  color: theme.colors.main000,
                  tooltip: "Came via paid search",
                },
                {
                  title: "Non-Organic",
                  value: 15,
                  color: "orange",
                  tooltip: "Came via natural search",
                },
              ]}
              title="Results"
            />
          </Segment>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Segment>
            <Segment>
              <Header>Daily Budget</Header>
              <Input value={`£${Math.ceil((totalCost / 100) * 120)}`} />
            </Segment>
            <Segment padded>
              <Progress
                percent={80}
                color="orange"
                label={`Projected Cost: £${totalCost}`}
              />
              <Block paddingTop={20}>
                <Table basic="very" celled>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Keywords</TableHeaderCell>
                      <TableHeaderCell>
                        Estimated Cost Per Click
                      </TableHeaderCell>
                      <TableHeaderCell>Estimated Daily Clicks</TableHeaderCell>
                      <TableHeaderCell>Estimated Daiy Cost</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{defaultKeywords.map(renderCostRow)}</TableBody>
                </Table>
              </Block>
            </Segment>
          </Segment>
        </GridColumn>
        <GridColumn>
          <Segment height="100%">
            <Segment padded>
              <Header>Add your keywords</Header>
              <List>{defaultKeywords.map(renderInputListItem)}</List>
              <Button icon="plus" />
            </Segment>
          </Segment>
        </GridColumn>
      </GridRow>
    </Grid>
  </Fragment>
));
