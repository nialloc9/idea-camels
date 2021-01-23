import React from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
  createMediaQuery,
} from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Button } from "../../Button";
import { Grid, GridColumn } from "../../Grid";
import { Card } from "../../Card";
import {theme, content} from '../../../config'

const { block3: { height, backgroundColor, fontFamily, overlay }, breakpoints } = theme;

const Container = styled.section`
  min-height: ${remCalc(height)};
  background-color: ${backgroundColor};
  display: flex;
  justify-content: center;
  position: relative;
  font-family: ${fontFamily};
`;

const Overlay = styled.div`
  position: relative;
  box-sizing: border-box;
  top: ${`${overlay.top}px`};
  min-height: ${remCalc(overlay.minHeight)};
  background-color: ${overlay.backgroundColor};
  max-width: ${remCalc(overlay.width)};

  ${createMediaQuery(breakpoints.tablet)} {
    position: absolute;
  }
`;

const Heading = styled.h1`
  display: block;
  font-size: ${remCalc(overlay.headingSize)};
  font-weight: ${overlay.headingWeight};
  line-height: ${remCalc(overlay.headingLineHeight)};
  margin: ${getMarginsOrPaddings(overlay.headingMargins)};
`;

const MainText = styled.p`
  font-size: ${remCalc(overlay.mainText.fontSize)};
  line-height: ${remCalc(overlay.mainText.lineHeight)};
  font-weight: ${overlay.mainText.fontWeight};
  margin: ${getMarginsOrPaddings(overlay.mainText.margins)};
`;

const ButtonContainer = styled.div`
  max-width: ${overlay.button.width ? remCalc(overlay.button.width) : "auto"};
  margin: ${getMarginsOrPaddings(overlay.button.margins)};
`;

const TextContainer = styled.div`
  padding: ${remCalc(overlay.padding)};
`;

const FeaturesContainer = styled.div`
  margin: ${getMarginsOrPaddings(overlay.features.featuresMargins)};
`;

const StyleCard = styled(Card)`
  width: 100% !important;
`;

const FeatureHeader = styled.h1`
  margin: ${getMarginsOrPaddings(overlay.features.headerMargins)};
  background-color: ${overlay.features.headerBackgroundColor};
  padding: ${remCalc(overlay.features.headerPadding)};
  font-family: ${overlay.features.headerFontFamily};
  display: flex;
  justify-content: center;
`;

const AnalyticsButton = withAnalytics(Button);

export default () => (
  <Container>
      <Overlay>
        <TextContainer>
          <Heading>{content.block3.heading.text}</Heading>
          <MainText>
            {content.block3.mainText.text}
          </MainText>
          <ButtonContainer>
            <AnalyticsButton
              href="/coming-soon"
              color="black"
              size={theme.block3.overlay.button.size}
              basic
              action="block3-button"
            >
              {content.block3.button.text}
            </AnalyticsButton>
          </ButtonContainer>
        </TextContainer>

        <FeatureHeader>{content.block3.featureHeader.text}</FeatureHeader>

        <FeaturesContainer>
          <Grid centered columns={3} stretched stackable>
            {content.block3.features.map((o) => (
              <GridColumn key={o.header.text}>
                <StyleCard header={o.header.text} description={o.description.text} />
              </GridColumn>
            ))}
          </Grid>
        </FeaturesContainer>
      </Overlay>
    </Container>
)
