import React, { Fragment } from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { useLocation } from "../components/Router";
import { Segment } from "../components/Styled/Segment";
import { Button } from "../components/Styled/Button";
import { Progress } from "../components/Progress";
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
import withAnalytics from "../hoc/withAnalytics";
import { withLoader } from "../hoc/withLoader";
import theme from "../config/theme";
import { remCalc } from "../utils/style";
import { formatToUtc } from "../utils/utils";
import { connect } from "../store";
import { getExperimentNotSelectedMessage } from "./utils/home";

const AnalyticsButton = withAnalytics(Button);

const LoaderMessage = withLoader(Message);

const renderInputListItem = ({ domain, keywords }) =>
  keywords.map((o) => <ListItem key={`keywords-${o}`}>{o}</ListItem>);

const Home = ({ isFetchLoading, experiments = [] }) => {
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
        <LoaderMessage isLoading={isFetchLoading} compact textAlign="center">
          {getExperimentNotSelectedMessage({ experiments })}
        </LoaderMessage>
      </Block>
    );
  }

  const {
    metrics: {
      clicks,
      impressions,
      average_cpc,
      average_cpm,
      cost_micros,
      engagements,
    },
    leads,
    keyword_0,
    keyword_1,
    keyword_2,
    keyword_3,
    keyword_4,
    keyword_5,
    headline,
    headline2,
    name,
    status,
  } = experiment;

  const progress =
    {
      PENDING: 0,
      INIT_INFRA: 10,
      BUILDING_INFRA: 30,
      DEPLOYING_INFRA: 50,
      BUILDING_CLIENT: 70,
      DEPLOYING_CLIENT: 90,
      COMPLETE: 100,
    }[status] || 0;

  if (progress !== 100) {
    return (
      <Block
        padding={remCalc(50)}
        textAlign="center"
        margin="auto"
        minHeight={remCalc(600)}
      >
        <Progress percent={progress} indicating progress />
        <Message compact textAlign="center">
          Experiment is building, please check again soon.
        </Message>
      </Block>
    );
  }

  return (
    <Fragment>
      <Grid columns={2} padded centered stackable>
        <GridRow>
          <GridColumn>
            <AnalyticsButton
              primary
              floated="left"
              href={`https://${name}`}
              target="_blank"
              action="view-experiment-click"
              label="home-page"
            >
              View Experiment
            </AnalyticsButton>
          </GridColumn>
          <GridColumn />
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
                    {
                      title: "Engagement",
                      value: engagements,
                      color: "green",
                      tooltip:
                        "Number of people who expanded your ad. A good indicator of interest.",
                    },
                  ]}
                  title="Metrics"
                />
              </Segment>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment>
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
                        <TableCell>
                          {formatToUtc(new Date(created_at))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Segment>
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

          <GridColumn>
            <Segment>
              <Segment>
                <Header>Budget</Header>
                <Table basic="very" celled>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Budget Spent</TableHeaderCell>
                      <TableHeaderCell>Average Cost Per Click</TableHeaderCell>
                      <TableHeaderCell>
                        Average Cost Per Impression
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{cost_micros}</TableCell>
                      <TableCell>{average_cpc || 0}</TableCell>
                      <TableCell>{average_cpm || 0}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Segment>
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = ({ experiment: { data, isFetchLoading } }) => ({
  experiments: data,
  isFetchLoading,
});

export default connect(mapStateToProps, {})(withPageAnalytics(Home));
