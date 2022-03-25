import React, { Fragment } from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { useLocation } from "../components/Router";
import { Segment } from "../components/Styled/Segment";
import { Button } from "../components/Styled/Button";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableBody,
} from "../components/Styled/Table";
import { Block } from "../components/Styled/Block";
import { Message } from "../components/Message";

import { PieChart } from "../components/PieChart";
import { Header } from "../components/Header";
import withPageAnalytics from "../hoc/withPageAnalytics";
import theme from "../config/theme";
import { remCalc } from "../utils/style";
import { formatToUtc } from "../utils/utils";
import { connect } from "../store";

const renderInputListItem = ({ keywords }) =>
  keywords.map((o) => <ListItem key={`keywords-${o}`}>{o}</ListItem>);

const Home = ({ experiments = [] }) => {
  const location = new URLSearchParams(useLocation().search);
  const experimentRef = location.get("experiment_ref");

  const experiment = experiments.find(
    (o) => o.experiment_ref === parseInt(experimentRef)
  );

  if (!experiment) {
    return (
      <Block
        padding={remCalc(50)}
        textAlign="center"
        margin="auto"
        minHeight={remCalc(600)}
      >
        <Message compact textAlign="center">
          Please create an experiment to get started.
        </Message>
      </Block>
    );
  }
  console.log(experiment);
  const {
    metrics: { clicks, impressions },
    leads,
    keyword_0,
    keyword_1,
    keyword_2,
    keyword_3,
    keyword_4,
    keyword_5,
    headline,
    headline2,
  } = experiment;

  return (
    <Fragment>
      <Grid columns={2} padded centered stackable>
        <GridRow>
          <GridColumn>
            <Block textAlign="left">
              <Button primary floated="left">
                Edit Experiment
              </Button>
            </Block>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Segment height="100%">
              <Segment size="small" height="100%" textAlign="center">
                <PieChart
                  width={remCalc(250)}
                  data={[
                    {
                      title: "Clicks",
                      value: clicks,
                      color: theme.colors.main000,
                      tooltip:
                        "Searched for and clicked on your add. A great indicator of interest.",
                    },
                    {
                      title: "Impressions",
                      value: impressions,
                      color: "orange",
                      tooltip:
                        "Searched for and looked at your ad. Can be good indicator of interest.",
                    },
                  ]}
                  title="Metrics"
                />
              </Segment>
            </Segment>
          </GridColumn>
          <GridColumn>
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
                  {leads.map(({ email, created_at }) => (
                    <TableRow>
                      <TableCell>{email}</TableCell>
                      <TableCell>{formatToUtc(new Date(created_at))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Segment>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Segment height="100%">
              <Segment padded>
                <Header>Headlines</Header>
                <List>
                  <ListItem>{headline}</ListItem>
                  <ListItem>{headline2}</ListItem>
                </List>
              </Segment>
              <Segment padded>
                <Header>Keywords</Header>
                <List>
                  {renderInputListItem({
                    keywords: [
                      keyword_0,
                      keyword_1,
                      keyword_2,
                      keyword_3,
                      keyword_4,
                      keyword_5,
                    ],
                  })}
                </List>
              </Segment>
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = ({ experiment: { data } }) => ({
  experiments: data,
});

export default connect(mapStateToProps, {})(withPageAnalytics(Home));
