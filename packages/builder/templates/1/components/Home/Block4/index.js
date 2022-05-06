import React from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
  withTheme,
} from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Grid, GridRow, GridColumn } from "../../Grid";
import { Segment } from "../../Styled/Segment";
import { Divider } from "../../Divider";
import { Image } from "../../Image";
import { Button } from "../../Button";

const AnalyticsButton = withAnalytics(Button);

const Container = styled.section`
  min-height: ${({
    theme: {
      block4: { height },
    },
  }) => remCalc(height)};
  padding: ${({
    theme: {
      block4: { paddings },
    },
  }) => getMarginsOrPaddings(paddings)};
  background-color: ${({
    theme: {
      block4: { backgroundColor },
    },
  }) => backgroundColor};
  font-family: ${({
    theme: {
      block4: { fontFamily },
    },
  }) => fontFamily};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HeadingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Heading = styled.h1`
  display: block;
  font-size: ${({
    theme: {
      block4: { heading },
    },
  }) => remCalc(heading.size)};
  font-weight: ${({
    theme: {
      block4: { heading },
    },
  }) => heading.weight};
  line-height: ${({
    theme: {
      block4: { heading },
    },
  }) => remCalc(heading.lineHeight)};
`;

const SubHeading = styled.p`
  display: block;
  font-size: ${({
    theme: {
      block4: { subHeading },
    },
  }) => remCalc(subHeading.size)};
  color: ${({
    theme: {
      block4: { subHeading },
    },
  }) => subHeading.color};
  font-weight: ${({
    theme: {
      block4: { subHeading },
    },
  }) => subHeading.weight};
  line-height: ${({
    theme: {
      block4: { subHeading },
    },
  }) => remCalc(subHeading.lineHeight)};
  margin: ${({
    theme: {
      block4: { subHeading },
    },
  }) => getMarginsOrPaddings(subHeading.margins)};
`;

const SplitCard = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({
    theme: {
      block4: { cardContainer },
    },
  }) => remCalc(cardContainer.width)};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({
    theme: {
      block4: { cardContainer },
    },
  }) => getMarginsOrPaddings(cardContainer.margins)};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${({
    theme: {
      block4: { cardContainer },
    },
  }) => getMarginsOrPaddings(cardContainer.paddings)};
`;

const ImageInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  margin: ${({
    theme: {
      block4: { button },
    },
  }) => getMarginsOrPaddings(button.margins)};
  max-width: ${({
    theme: {
      block4: { button },
    },
  }) => (button.width ? remCalc(button.width) : "auto")};
`;

export default withTheme(
  ({
    theme: {
      block4: { button, firstCard },
    },
    content,
  }) => (
    <Container>
      <HeadingContainer>
        <Heading>{content.block4.heading.text}</Heading>
        <SubHeading>{content.block4.subHeading.text}</SubHeading>
      </HeadingContainer>

      <CardContainer>
        <SplitCard>
          <Segment>
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical />

              <GridRow verticalAlign="middle">
                <GridColumn>
                  <ImageContainer>
                    <ImageInnerContainer>
                      <Image
                        size={firstCard.image.size}
                        src={content.block4.card.image.src}
                        alt={content.block4.card.image.alt}
                      />
                    </ImageInnerContainer>
                  </ImageContainer>
                </GridColumn>

                <GridColumn>
                  <Heading></Heading>
                  <SubHeading></SubHeading>
                  <ButtonContainer>
                    <AnalyticsButton
                      href="/coming-soon"
                      color="black"
                      size={button.size}
                      basic
                      action="block4-button"
                    >
                      {content.block4.card.button.text}
                    </AnalyticsButton>
                  </ButtonContainer>
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
        </SplitCard>
      </CardContainer>
    </Container>
  )
);