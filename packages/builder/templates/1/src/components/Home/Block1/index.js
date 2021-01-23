import React from "react";
import { remCalc, styled } from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Image } from "../../Image";
import { Button } from "../../Button";
import {theme, content} from '../../../config'

const { block1: { height, paddings, backgroundColor, color, fontFamily, width, headingSize, headingLineHeight, headingMargins, subHeadingLineHeight, subHeadingSize, subHeadingMargins, buttonWidth } } = theme;

const Container = styled.section`
  min-height: ${remCalc(height)};
  padding: ${
    `${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(
      paddings[2]
    )} ${remCalc(paddings[3])}`};
  box-sizing: border-box;
  background-color: ${backgroundColor};
  color: ${color};
  font-family: ${fontFamily};
  display: flex;
  justify-content: center;
  color: ${color};
  font-family: ${fontFamily};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${remCalc(width)};
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  display: block;
  font-size: ${remCalc(headingSize)};
  line-height: ${remCalc(headingLineHeight)};
  margin: ${
    `${remCalc(headingMargins[0])} ${remCalc(headingMargins[1])} ${remCalc(
      headingMargins[2]
    )} ${remCalc(headingMargins[3])}`};
`;

const SubHeading = styled.p`
  display: block;
  line-height: ${remCalc(subHeadingLineHeight)};
  font-size: ${remCalc(subHeadingSize)};
  margin: ${
    `${remCalc(subHeadingMargins[0])} ${remCalc(
      subHeadingMargins[1]
    )} ${remCalc(subHeadingMargins[2])} ${remCalc(subHeadingMargins[3])}`};
`;

const ButtonContainer = styled.div`
  max-width: ${buttonWidth ? remCalc(buttonWidth) : "auto"};
`;

const AnalyticsImage = withAnalytics(Image);

const AnalyticsButton = withAnalytics(Button);

export default () => (
  <Container>
    <InnerContainer>
      <ImageContainer>
        <AnalyticsImage
          alt={content.block1.logo.alt}
          size="small"
          src={content.block1.logo.src}
          action="block1-logo"
        />
      </ImageContainer>
      <Heading>
        {content.block1.heading.text}
      </Heading>
      <SubHeading>
        {content.block1.subHeading.text}
      </SubHeading>

      <ButtonContainer>
        <AnalyticsButton
          href="/coming-soon"
          action="block1-button"
          color="black"
          size={theme.block1.buttonSize}
          basic
        >
          {content.block1.button.text}
        </AnalyticsButton>
      </ButtonContainer>
    </InnerContainer>
  </Container>
)
