import React from "react";
import withPageAnalytics from "../hoc/withPageAnalytics";
import Price from "../components/Price";
import { Segment } from "../components/Styled/Segment";
import { Section } from "../components/Styled/Section";
import { Image } from "../components/Styled/Image";
import { Card } from "../components/Card";
import { Grid, GridColumn } from "../components/Grid";
import ppuImage from "../static/ppu.png";

export default withPageAnalytics(() => (
  <Section>
    <Grid stackable columns={3} padded centered textAlign="center">
      <GridColumn />
      <GridColumn>
        <Segment>
          <Card centered>
            <Image src={ppuImage} wrapped ui={false} />
            <Card.Content>
              <Card.Header>Pay per usage</Card.Header>
              <Card.Description>
                IdeaCamels is a pay per usage product where you only pay for
                what you use. No contracts, no hassle, and certainly no hidden
                fees. No more tricky terms just value added as you need it.
              </Card.Description>
            </Card.Content>
          </Card>
          <Price
            domainFee={5}
            adBudget={50}
            total={55}
            heading="Example Experiment"
          />
        </Segment>
      </GridColumn>
      <GridColumn />
    </Grid>
  </Section>
));
