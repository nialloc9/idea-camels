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
import { SoftLink } from "../components/Link";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { withMessage } from "../hoc/withMessage";
import { withLoader } from "../hoc/withLoader";
import { withDisplay } from "../hoc/withDisplay";
import withAnalytics from "../hoc/withAnalytics";
import theme from "../config/theme";
import { remCalc } from "../utils/style";
import { formatToUtc, formatGoogleAdsMicros } from "../utils/utils";
import { connect } from "../store";

const AnalyticsAnchor = withAnalytics("a");

const LoaderMessage = withLoader(Message);

const MessageOrSegment = withMessage(Segment);

const DisplaySegment = withDisplay(Segment);

const AnalyticsSoftLink = withAnalytics(SoftLink);

const DisplaySoftLink = withDisplay(AnalyticsSoftLink);

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
        <LoaderMessage
          loadingIconSize="small"
          isLoading={isFetchLoading}
          compact
          textAlign="center"
        >
          Please {experiments.length > 0 && "select or "}
          <AnalyticsAnchor
            action="home-anchor-click"
            label="redirect-to-create-experiment"
            href="/create-experiment"
          >
            create an experiment
          </AnalyticsAnchor>{" "}
          to get started.
        </LoaderMessage>
      </Block>
    );
  }

  const {
    campaign_name = "",
    metrics: {
      clicks,
      impressions,
      average_cpc,
      average_cpm,
      cost_micros,
      engagements,
    } = {},
    leads = [],
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
    budget,
  } = experiment;

  const showCampaignData = campaign_name !== "";

  const showPieChart =
    showCampaignData &&
    [clicks > 0, impressions > 0, engagements > 0].some((o) => o);

  const pieChartMessage = showCampaignData
    ? "Campaign metrics will display here once you have leads interacting with your ads."
    : "Super charge your experiment with ads on Google above.";

  const progress =
    {
      PENDING: 0,
      INITIALISING_EXPERIMENT: 10,
      EXPERIMENT_INITIALISED: 20,
      CONFIGURING_INFRA: 30,
      CONFIGURED_INFRA: 40,
      CONFIGURING_CLIENT: 50,
      CLIENT_CONFIGURED: 60,
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
            <Button
              primary
              floated="left"
              href={`https://${name}`}
              target="_blank"
              action="view-experiment-click"
              icon="eye"
              content="View Experiment"
            />
            {/* <Button
              primary
              icon="edit"
              floated="left"
              href={`${config.domainUrl}/edit-experiment?experiment_ref=${experimentRef}`}
              action="edit-experiment-click"
            >
              Edit Experiment
            </Button> */}

            <DisplaySoftLink
              isDisplayed={showCampaignData}
              action="create-campaign"
              to={`/create-campaign?experiment_ref=${experimentRef}`}
            >
              <Button
                primary
                floated="left"
                icon="star"
                content="Super Charge"
                positive
              />
            </DisplaySoftLink>
          </GridColumn>

          <GridColumn />
        </GridRow>
        <GridRow>
          <GridColumn>
            <Segment height="100%">
              <MessageOrSegment
                message={showPieChart ? undefined : pieChartMessage}
                size="small"
                height="100%"
                textAlign="center"
              >
                <PieChart
                  width={remCalc(250)}
                  data={[
                    {
                      title: "Clicks",
                      value: clicks || 0,
                      color: theme.colors.main000,
                      tooltip:
                        "Searched for and clicked on your add. A great indicator of interest.",
                    },
                    {
                      title: "Impressions",
                      value: impressions || 0,
                      color: "orange",
                      tooltip:
                        "Searched for and looked at your ad. A good indicator of interest.",
                    },
                    {
                      title: "Expanded Ad",
                      value: engagements || 0,
                      color: "green",
                      tooltip:
                        "Number of people who expanded your ad. A decent indicator of interest.",
                    },
                  ]}
                  title="Metrics"
                />
              </MessageOrSegment>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment>
              <MessageOrSegment
                message={
                  showCampaignData
                    ? undefined
                    : "Leads will be shown here once they add their emails."
                }
              >
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
              </MessageOrSegment>
            </Segment>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Segment height="100%">
              <MessageOrSegment
                padded
                message={
                  showCampaignData
                    ? undefined
                    : "Your ads will display here once you super charge above."
                }
              >
                <Header>Headlines</Header>
                <List>
                  <ListItem>{headline}</ListItem>
                  <ListItem>{headline2}</ListItem>
                </List>
              </MessageOrSegment>
              <DisplaySegment padded isDisplayed={showCampaignData}>
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
              </DisplaySegment>
            </Segment>
          </GridColumn>

          <GridColumn>
            <MessageOrSegment
              message={
                showCampaignData
                  ? undefined
                  : "Your ad budget will display here once you super charge above."
              }
            >
              <Segment>
                <Header>Budget ($)</Header>
                <Table basic="very" celled>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Total Budget</TableHeaderCell>
                      <TableHeaderCell>Budget Spent</TableHeaderCell>
                      <TableHeaderCell>Average Cost Per Click</TableHeaderCell>
                      <TableHeaderCell>
                        Average Cost Per Impression
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{budget}</TableCell>
                      <TableCell>
                        {formatGoogleAdsMicros(cost_micros)}
                      </TableCell>
                      <TableCell>
                        {formatGoogleAdsMicros(average_cpc)}
                      </TableCell>
                      <TableCell>
                        {formatGoogleAdsMicros(average_cpm)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Segment>
            </MessageOrSegment>
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
