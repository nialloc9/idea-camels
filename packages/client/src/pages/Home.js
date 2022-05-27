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
import { withLoader } from "../hoc/withLoader";
import theme from "../config/theme";
import { remCalc } from "../utils/style";
import { formatToUtc, formatGoogleAdsMicros, createDate } from "../utils/utils";
import { connect } from "../store";
import { getExperimentNotSelectedMessage } from "./utils/home";

const LoaderMessage = withLoader(Message);

const l = [
  { email: "zeitlin@icloud.com", created_at: "03/18/2022" },
  { email: "seemant@sbcglobal.net", created_at: "03/15/2022" },
  { email: "sherzodr@yahoo.ca", created_at: "03/15/2022" },
  { email: "lauronen@msn.com", created_at: "03/16/2022" },
  { email: "hwestiii@gmail.net", created_at: "03/17/2022" },
  { email: "glenz@icloud.com", created_at: "03/18/2022" },
  { email: "jeteve@aol.com", created_at: "03/15/2022" },
  { email: "miami@gmail.net", created_at: "03/16/2022" },
];

const renderInputListItem = ({ domain, keywords }) =>
  keywords.map((o) => <ListItem key={`keywords-${o}`}>{o}</ListItem>);

const Home = ({ isFetchLoading, experiments = [] }) => {
  const location = new URLSearchParams(useLocation().search);
  const experimentRef = location.get("experiment_ref");

  const experiment = experiments.find(
    (o) => o.experiment_ref === parseInt(experimentRef)
  );

  // if (!experiment) {
  //   return (
  //     <Block
  //       padding={remCalc(50)}
  //       textAlign="center"
  //       margin="auto"
  //       minHeight={remCalc(600)}
  //     >
  //       <LoaderMessage isLoading={isFetchLoading} compact textAlign="center">
  //         {getExperimentNotSelectedMessage({ experiments })}
  //       </LoaderMessage>
  //     </Block>
  //   );
  // }

  // const {
  //   metrics: {
  //     clicks,
  //     impressions,
  //     average_cpc,
  //     average_cpm,
  //     cost_micros,
  //     engagements,
  //   } = {},
  //   leads,
  //   keyword_0,
  //   keyword_1,
  //   keyword_2,
  //   keyword_3,
  //   keyword_4,
  //   keyword_5,
  //   headline,
  //   headline2,
  //   name,
  //   status,
  // } = experiment;

  // const progress =
  //   {
  //     PENDING: 0,
  //     INITIALISING_EXPERIMENT: 10,
  //     EXPERIMENT_INITIALISED: 20,
  //     CONFIGURING_INFRA: 30,
  //     CONFIGURED_INFRA: 40,
  //     CONFIGURING_CLIENT: 50,
  //     CLIENT_CONFIGURED: 60,
  //     CONFIGURING_CAMPAIGN: 70,
  //     CAMPAIGN_CONFIGURED: 80,
  //     COMPLETE: 100,
  //   }[status] || 0;

  // if (progress !== 100) {
  //   return (
  //     <Block
  //       padding={remCalc(50)}
  //       textAlign="center"
  //       margin="auto"
  //       minHeight={remCalc(600)}
  //     >
  //       <Progress percent={progress} indicating progress />
  //       <Message compact textAlign="center">
  //         Experiment is building, please check again soon.
  //       </Message>
  //     </Block>
  //   );
  // }

  return (
    <Fragment>
      <Grid columns={2} padded centered stackable>
        <GridRow>
          <GridColumn>
            <Button
              primary
              floated="left"
              href={`https://rentabike.com`}
              target="_blank"
              action="view-experiment-click"
            >
              View Experiment
            </Button>
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
                      value: 79,
                      color: theme.colors.main000,
                      tooltip:
                        "Searched for and clicked on your add. A great indicator of interest.",
                    },
                    {
                      title: "Impressions",
                      value: 376,
                      color: "orange",
                      tooltip:
                        "Searched for and looked at your ad. A good indicator of interest.",
                    },
                    {
                      title: "Expanded Ad",
                      value: 27,
                      color: "green",
                      tooltip:
                        "Number of people who expanded your ad. A decent indicator of interest.",
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
                    {l.map(
                      ({ email, created_at }) =>
                        console.log(created_at) || (
                          <TableRow>
                            <TableCell>{email}</TableCell>
                            <TableCell>
                              {formatToUtc(new Date(created_at))}
                            </TableCell>
                          </TableRow>
                        )
                    )}
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
                  <ListItem>Rent your bike today</ListItem>
                  <ListItem>Own a bike, rent it out</ListItem>
                </List>
              </Segment>
              <Segment padded>
                <Header>Keywords</Header>
                <List>
                  {renderInputListItem({
                    keywords: [
                      "rent bike",
                      "rent a bike",
                      "where can i rent a bike",
                      "sell my bike",
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
                      <TableCell>70.31</TableCell>
                      <TableCell>0.89</TableCell>
                      <TableCell>0.21</TableCell>
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
