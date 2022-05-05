import React from "react";
import { remCalc, styled, withTheme } from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Image } from "../../Image";
import { Button } from "../../Styled/Button";

const Container = styled.section`
  min-height: ${({
    theme: {
      block1: { height },
    },
  }) => remCalc(height)};
  padding: ${({
    theme: {
      block1: { paddings },
    },
  }) =>
    `${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(
      paddings[2]
    )} ${remCalc(paddings[3])}`};
  box-sizing: border-box;
  background-color: ${({
    theme: {
      block1: { backgroundColor },
    },
  }) => backgroundColor};
  color: ${({
    theme: {
      block1: { color },
    },
  }) => color};
  font-family: ${({
    theme: {
      block1: { fontFamily },
    },
  }) => fontFamily};
  display: flex;
  justify-content: center;
  color: ${({
    theme: {
      block1: { color },
    },
  }) => color};
  font-family: ${({
    theme: {
      block1: { fontFamily },
    },
  }) => fontFamily};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${({
    theme: {
      block1: { width },
    },
  }) => remCalc(width)};
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  display: block;
  font-size: ${({
    theme: {
      block1: { headingSize },
    },
  }) => remCalc(headingSize)};
  line-height: ${({
    theme: {
      block1: { headingLineHeight },
    },
  }) => remCalc(headingLineHeight)};
  margin: ${({
    theme: {
      block1: { headingMargins },
    },
  }) =>
    `${remCalc(headingMargins[0])} ${remCalc(headingMargins[1])} ${remCalc(
      headingMargins[2]
    )} ${remCalc(headingMargins[3])}`};
`;

const SubHeading = styled.p`
  display: block;
  line-height: ${({
    theme: {
      block1: { subHeadingLineHeight },
    },
  }) => remCalc(subHeadingLineHeight)};
  font-size: ${({
    theme: {
      block1: { subHeadingSize },
    },
  }) => remCalc(subHeadingSize)};
  margin: ${({
    theme: {
      block1: { subHeadingMargins },
    },
  }) =>
    `${remCalc(subHeadingMargins[0])} ${remCalc(
      subHeadingMargins[1]
    )} ${remCalc(subHeadingMargins[2])} ${remCalc(subHeadingMargins[3])}`};
`;

const ButtonContainer = styled.div`
  max-width: ${({
    theme: {
      block1: { buttonWidth },
    },
  }) => (buttonWidth ? remCalc(buttonWidth) : "auto")};
`;

const AnalyticsImage = withAnalytics(Image);

export default withTheme(({ theme: { block1 } }) => (
  <Container>
    <InnerContainer>
      <ImageContainer>
        <AnalyticsImage
          alt="idea camels logo"
          size="small"
          src={block1.logo}
          action="block1-logo"
        />
      </ImageContainer>
      <Heading>
        Have an idea? <br /> Not sure if it's worth doing?
      </Heading>
      <SubHeading>
        Find out are people searching for your idea.
        <p>All in under 1 hour!!</p>
      </SubHeading>

      <ButtonContainer>
        <Button
          href="/sign-up"
          action="block1-button"
          color="black"
          size={block1.buttonSize}
          basic
        >
          Buy Now
        </Button>
      </ButtonContainer>
    </InnerContainer>
  </Container>
));
