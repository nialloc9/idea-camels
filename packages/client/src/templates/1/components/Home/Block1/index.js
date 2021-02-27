import React from "react";
import { remCalc, styled, withTheme } from "../../../utils/style";
import { Image } from "../../Image";
import { Button } from "../../Button";

const Container = styled.section`
  min-height: ${({ theme: { block1: { height } } }) => remCalc(height)};
  padding: ${
    ({ theme: { block1: { paddings } } }) => `${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(
      paddings[2]
    )} ${remCalc(paddings[3])}`};
  box-sizing: border-box;
  background-color: ${({ theme: { block1: { backgroundColor } } }) => backgroundColor};
  color: ${({ theme: { block1: { color } } }) => color};
  font-family: ${({ theme: { block1: { fontFamily } } }) => fontFamily};
  display: flex;
  justify-content: center;
  color: ${({ theme: { block1: { color } } }) => color};
  font-family: ${({ theme: { block1: { fontFamily } } }) => fontFamily};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${({ theme: { block1: { width } } }) => remCalc(width)};
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  display: block;
  font-size: ${({ theme: { block1: { headingSize } } }) => remCalc(headingSize)};
  line-height: ${({ theme: { block1: { headingLineHeight } } }) => remCalc(headingLineHeight)};
  margin: ${
    ({ theme: { block1: { headingMargins } } }) => `${remCalc(headingMargins[0])} ${remCalc(headingMargins[1])} ${remCalc(
      headingMargins[2]
    )} ${remCalc(headingMargins[3])}`};
`;

const SubHeading = styled.p`
  display: block;
  line-height: ${({ theme: { block1: { subHeadingLineHeight } } }) => remCalc(subHeadingLineHeight)};
  font-size: ${({ theme: { block1: { subHeadingSize } } }) => remCalc(subHeadingSize)};
  margin: ${({ theme: { block1: { subHeadingMargins } } }) => 
    `${remCalc(subHeadingMargins[0])} ${remCalc(
      subHeadingMargins[1]
    )} ${remCalc(subHeadingMargins[2])} ${remCalc(subHeadingMargins[3])}`};
`;

const ButtonContainer = styled.div`
  max-width: ${({ theme: { block1: { buttonWidth } } }) => buttonWidth ? remCalc(buttonWidth) : "auto"};
`;

export default withTheme(({ theme: { block1: { buttonSize } }, content }) => (
  <Container>
    <InnerContainer>
      <ImageContainer>
        <Image
          alt={content.block1.logo.alt}
          size="small"
          src={content.block1.logo.src}
        />
      </ImageContainer>
      <Heading>
        {content.block1.heading.text}
      </Heading>
      <SubHeading>
        {content.block1.subHeading.text}
      </SubHeading>

      <ButtonContainer>
        <Button
          color="black"
          size={buttonSize}
          basic
        >
          {content.block1.button.text}
        </Button>
      </ButtonContainer>
    </InnerContainer>
  </Container>
))
