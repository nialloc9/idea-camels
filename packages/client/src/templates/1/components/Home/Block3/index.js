import React from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
  createMediaQuery,
  withTheme
} from "../../../utils/style";
import { Grid, GridColumn } from "../../Grid";
import { Card, CardHeader, CardDescription, CardContent } from "../../Card";
import { EditableText, EditableButton } from "../../Edit";

const Container = styled.section`
  min-height: ${({ theme: { block3: { height } } }) => remCalc(height)};
  background-color: ${({ theme: { block3: { backgroundColor } } }) => backgroundColor};
  display: flex;
  justify-content: center;
  position: relative;
  font-family: ${({ theme: { block3: { fontFamily } } }) => fontFamily};
`;

const Overlay = styled.div`
  position: relative;
  box-sizing: border-box;
  top: ${`${({ theme: { block3: { overlay } } }) => overlay.top}px`};
  min-height: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.minHeight)};
  background-color: ${({ theme: { block3: { overlay } } }) => overlay.backgroundColor};
  max-width: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.width)};

  ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
    position: absolute;
  }
`;

const Heading = styled.h1`
  display: block;
  font-size: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.headingSize)};
  font-weight: ${({ theme: { block3: { overlay } } }) => overlay.headingWeight};
  line-height: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.headingLineHeight)};
  margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.headingMargins)};
`;

const MainText = styled.p`
  font-size: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.mainText.fontSize)};
  line-height: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.mainText.lineHeight)};
  font-weight: ${({ theme: { block3: { overlay } } }) => overlay.mainText.fontWeight};
  margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.mainText.margins)};
`;

const ButtonContainer = styled.div`
  max-width: ${({ theme: { block3: { overlay } } }) => overlay.button.width ? remCalc(overlay.button.width) : "auto"};
  margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.button.margins)};
`;

const TextContainer = styled.div`
  padding: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.padding)};
`;

const FeaturesContainer = styled.div`
  margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.features.featuresMargins)};
`;

const StyleCard = styled(Card)`
  width: 100% !important;
`;

const FeatureHeader = styled.h1`
  margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.features.headerMargins)};
  background-color: ${({ theme: { block3: { overlay } } }) => overlay.features.headerBackgroundColor};
  padding: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.features.headerPadding)};
  font-family: ${({ theme: { block3: { overlay } } }) => overlay.features.headerFontFamily};
  display: flex;
  justify-content: center;
`;

const onSetFeatures = ({ features, key, value, index }) => {
  const newFeatures = [...features];

  newFeatures[index] = {...newFeatures[index], [key]: { text: value }};

  return newFeatures
}

export default withTheme(({ theme, content, onSetExperiment }) => (
  <Container>
      <Overlay>
        <TextContainer>
          <Heading><EditableText initialText={content.block3.heading.text} onSubmit={text => onSetExperiment({ content: { block3: { heading: { text } } } })} /></Heading>
          <MainText>
          <EditableText initialText={content.block3.mainText.text} onSubmit={text => onSetExperiment({ content: { block3: { mainText: { text } } } })} />
          </MainText>
          <ButtonContainer>
            <EditableButton
              color="black"
              size={theme.block3.overlay.button.size}
              basic
              initialText={content.block3.button.text}
              onSubmit={text => onSetExperiment({ content: { block3: { button: { text } } } })}
            />
          </ButtonContainer>
        </TextContainer>

        <FeatureHeader><EditableText initialText={content.block3.featureHeader.text} onSubmit={text => onSetExperiment({ content: { block3: { featureHeader: { text } } } })} /></FeatureHeader>

        <FeaturesContainer>
          <Grid centered columns={3} stretched stackable>
            {content.block3.features.map((o, i) => (
              <GridColumn key={o.header.text}>
                <StyleCard>
                  <CardContent>
                    <CardHeader>
                      <EditableText initialText={o.header.text} onSubmit={text => onSetExperiment({ content: { block3: { features: onSetFeatures({ features: content.block3.features, value: text, key: 'header', index: i }) } } })} />
                    </CardHeader>
                    <CardDescription>
                      <EditableText rows={7} initialText={o.description.text} onSubmit={text => onSetExperiment({ content: { block3: { features: onSetFeatures({ features: content.block3.features, value: text, key: 'description', index: i }) } } })} />
                    </CardDescription>
                  </CardContent>
                </StyleCard>
              </GridColumn>
            ))}
          </Grid>
        </FeaturesContainer>
      </Overlay>
    </Container>
))
