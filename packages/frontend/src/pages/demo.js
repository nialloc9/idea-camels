import React, { Fragment } from 'react'
import Footer from 'components/Footer';
import {Segment} from 'components/Segment';
import {Grid, GridColumn} from 'components/Grid';
import {List, ListItem} from 'components/List';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {Header} from 'components/Header';
import {Progress} from 'components/Progress';
import {Image} from 'components/Image';
import {Pagination} from 'components/Pagination';
import {Table, TableHeader, TableHeaderCell, TableRow, TableCell, TableBody} from 'components/Table';
import { remCalc, styled } from 'utils/style';
import dragAndDrop from 'static/dragAndDrop.png';

const defaultKeywords = [
  {
    text: "Test my idea",
    estimatedCostPerClick: 1,
    estimatedDailyClicks: 12
  },
  {
    text: "Is my idea good?",
    estimatedCostPerClick: 3,
    estimatedDailyClicks: 1
  },
  {
    text: "Business idea",
    estimatedCostPerClick: 8,
    estimatedDailyClicks: 4
  },
  {
    text: "Marketing idea",
    estimatedCostPerClick: 6,
    estimatedDailyClicks: 12
  },
  {
    text: "Is my website idea good?",
    estimatedCostPerClick: 7,
    estimatedDailyClicks: 6
  },
  {
    text: "Test my website idea cheaply",
    estimatedCostPerClick: 1,
    estimatedDailyClicks: 1
  },
]

const confirmedInterest = [
  "tomb145@supersmarts.com",
  "mconnolly@conconnolys.co.uk",
  "jsmarts2@strykeng.com",
  "t.bond@jjohnson.co.uk",
  "charlie.t@farnay.com",
]

const totalCost = defaultKeywords.reduce((total, { estimatedCostPerClick, estimatedDailyClicks }) => total + (estimatedCostPerClick * estimatedDailyClicks), 0);

const renderInputListItem = ({text}) => <ListItem key={`keywords-${text}`}><Input fluid value={text} /></ListItem>;

const renderCostRow = ({ text, estimatedCostPerClick, estimatedDailyClicks }) => (
  <TableRow>
    <TableCell>{text}</TableCell>
    <TableCell>£{estimatedCostPerClick}</TableCell>
    <TableCell>{estimatedDailyClicks}</TableCell>
    <TableCell>£{estimatedCostPerClick * estimatedDailyClicks}</TableCell>
  </TableRow>
);

const SyledImage = styled(Image)`
  margin: ${({margin}) => margin && margin};
`;
const Spacer = styled.div`
  padding-top: ${({paddingTop}) => paddingTop && remCalc(paddingTop)};
  width: ${({width}) => width && width};
  margin: ${({margin}) => margin && margin};
`;

export default () => (
  <Fragment>
    <Grid padded centered columns={2}>
      <GridColumn>
        <Segment>
          <SyledImage src={dragAndDrop} />
          </Segment>
      </GridColumn>
      <GridColumn>
      <Segment>
              <Header>Results</Header>
              <Table basic='very' celled >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Number of visitors</TableHeaderCell>
                  <TableHeaderCell>Buy now/Sign up clicks</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                    <TableCell>421</TableCell>
                    <TableCell>56</TableCell>
                </TableRow>
              </TableBody>
              </Table>
            </Segment>
            <Segment padded>  
            <Header>Confirmed Interest</Header>
              <List celled relaxed>
                  {confirmedInterest.map(o => <ListItem key={o}>{o}</ListItem>)}
              </List>
              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={10}
              />
            </Segment>
      </GridColumn>

    </Grid>
      <Grid padded stackable columns={2}>
          <GridColumn>
            <Segment>
              <Header>Daily Budget</Header>
              <Input value={`£${Math.ceil(totalCost / 100 * 120)}`}/>
            </Segment>
            <Segment padded>
            <Progress percent={80} color="orange" label={`Projected Cost: £${totalCost}`} />
            
              <Spacer paddingTop={20}>
              <Table basic='very' celled>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Keywords</TableHeaderCell>
                  <TableHeaderCell>Estimated Cost Per Click</TableHeaderCell>
                  <TableHeaderCell>Estimated Daily Clicks</TableHeaderCell>
                  <TableHeaderCell>Estimated Daiy Cost</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultKeywords.map(renderCostRow)}
              </TableBody>
              </Table>
              </Spacer>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment padded>
                <Header>Add your keywords</Header>
                <List>
                  {defaultKeywords.map(renderInputListItem)}
                </List>
                <Button icon="plus" />
            </Segment>
          </GridColumn>
        </Grid>
    <Footer />
  </Fragment>
)
