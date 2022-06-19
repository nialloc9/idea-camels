import React from "react";
import {
  remCalc,
  styled,
  withTheme,
  getMarginsOrPaddings,
  createMediaQuery,
} from "../../../utils/style";
import { Button } from "../../Styled/Button";
import { Grid, GridColumn } from "../../Grid";
import { Card } from "../../Card";

const Container = styled.section`
  padding: 0 0 ${remCalc(40)} 0;
  min-height: ${({
    theme: {
      block3: { height },
    },
  }) => remCalc(height)};
  background-color: ${({
    theme: {
      block3: { backgroundColor },
    },
  }) => backgroundColor};
  display: flex;
  justify-content: center;
  position: relative;
  font-family: ${({
    theme: {
      block3: { fontFamily },
    },
  }) => fontFamily};
`;

const Overlay = styled.div`
  position: relative;
  box-sizing: border-box;

  min-height: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.minHeight)};
  background-color: ${({
    theme: {
      block3: { overlay },
    },
  }) => overlay.backgroundColor};
  max-width: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.width)};

  ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
    position: absolute;
    top: ${({
      theme: {
        block3: { overlay },
      },
    }) => `${overlay.top}px`};
  }
`;

const Heading = styled.h1`
  display: block;
  font-size: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.headingSize)};
  font-weight: ${({
    theme: {
      block3: { overlay },
    },
  }) => overlay.headingWeight};
  line-height: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.headingLineHeight)};
  margin: ${({
    theme: {
      block3: { overlay },
    },
  }) => getMarginsOrPaddings(overlay.headingMargins)};
`;

const MainText = styled.p`
  font-size: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.mainText.fontSize)};
  line-height: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.mainText.lineHeight)};
  font-weight: ${({
    theme: {
      block3: { overlay },
    },
  }) => overlay.mainText.fontWeight};
  margin: ${({
    theme: {
      block3: { overlay },
    },
  }) => getMarginsOrPaddings(overlay.mainText.margins)};
`;

const ButtonContainer = styled.div`
  max-width: ${({
    theme: {
      block3: { overlay },
    },
  }) => (overlay.button.width ? remCalc(overlay.button.width) : "auto")};
  margin: ${({
    theme: {
      block3: { overlay },
    },
  }) => getMarginsOrPaddings(overlay.button.margins)};
`;

const TextContainer = styled.div`
  padding: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.padding)};
`;

const FeaturesContainer = styled.div`
  margin: ${({
    theme: {
      block3: { overlay },
    },
  }) => getMarginsOrPaddings(overlay.features.featuresMargins)};
`;

const StyleCard = styled(Card)`
  width: 100% !important;
`;

const FeatureHeader = styled.h1`
  margin: ${({
    theme: {
      block3: { overlay },
    },
  }) => getMarginsOrPaddings(overlay.features.headerMargins)};
  background-color: ${({
    theme: {
      block3: { overlay },
    },
  }) => overlay.features.headerBackgroundColor};
  padding: ${({
    theme: {
      block3: { overlay },
    },
  }) => remCalc(overlay.features.headerPadding)};
  font-family: ${({
    theme: {
      block3: { overlay },
    },
  }) => overlay.features.headerFontFamily};
  display: flex;
  justify-content: center;
`;

const features = [
  {
    header: "Validation",
    description:
      "Idea Camels combines paid search with simplified landing pages to tell you are people searching for your answer to their problem. By providing reports and a list of emails of people who interacted with your idea page you can be sure your idea is one worth doing.",
  },
  {
    header: "Simple",
    description:
      "SEO, Development, Paid Search. A never ending list of hoops to jump through and all you want is to know 'is it worth doing?'. Idea Camels simplifies all of this by providing one seamless experience to provide feedback on your idea as soon as possible.",
  },
  {
    header: "Fast",
    description:
      "Whether you are a developer, marketing exec, or any other are of the business who wants to wait months to know if people even want your product? Idea Camels can provide your with the validation you need to move your idea into development.",
  },
];

export default withTheme(({ theme: { block3 } }) => (
  <Container>
    <Overlay>
      <TextContainer>
        <Heading>Welcome to Idea Camels</Heading>
        <MainText>
          Combining a super modern UI with paid search to create a landing page
          and drive traffic to it based on other internet users search keywords.
          Don't spend time creating a fully fleged site when all you want to
          know is it worth the development time. Instead you can know in a
          matter of days if your new idea is worth persuing.
        </MainText>
        <ButtonContainer>
          <Button
            href="/sign-up"
            color="black"
            size={block3.overlay.button.size}
            basic
            action="learn-more-click"
            label="block3"
          >
            Learn More
          </Button>
        </ButtonContainer>
      </TextContainer>

      <FeatureHeader>FEATURES</FeatureHeader>

      <FeaturesContainer>
        <Grid centered columns={3} stretched stackable>
          {features.map((o) => (
            <GridColumn key={o.header}>
              <StyleCard {...o} />
            </GridColumn>
          ))}
        </Grid>
      </FeaturesContainer>
    </Overlay>
  </Container>
));
