import React from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
} from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Grid, GridRow, GridColumn } from "../../Grid";
import { Segment } from "../../Styled/Segment";
import { Divider } from "../../Divider";
import { Image } from "../../Image";
import { Button } from "../../Button";
import {theme, content} from '../../../config'

const AnalyticsButton = withAnalytics(Button);

const { block4: { height, paddings, backgroundColor, fontFamily, heading, subHeading,cardContainer, button, firstCard } } = theme;

const Container = styled.section`
  min-height: ${remCalc(height)};
  padding: ${getMarginsOrPaddings(paddings)};
  background-color: ${backgroundColor};
  font-family: ${fontFamily};
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
  font-size: ${remCalc(heading.size)};
  font-weight: ${heading.weight};
  line-height: ${remCalc(heading.lineHeight)};
`;

const SubHeading = styled.p`
  display: block;
  font-size: ${remCalc(subHeading.size)};
  color: ${subHeading.color};
  font-weight: ${subHeading.weight};
  line-height: ${remCalc(subHeading.lineHeight)};
  margin: ${getMarginsOrPaddings(subHeading.margins)};
`;

const SplitCard = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${remCalc(cardContainer.width)};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${getMarginsOrPaddings(cardContainer.margins)};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: ${getMarginsOrPaddings(cardContainer.paddings)};
`;

const ImageInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  margin: ${getMarginsOrPaddings(button.margins)};
  max-width: ${button.width ? remCalc(button.width) : "auto"};
`;

export default () => (
  <Container>
      <HeadingContainer>
        <Heading>{content.block4.heading.text}</Heading>
        <SubHeading>
          {content.block4.subHeading.text}
        </SubHeading>
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
                  <SubHeading>
                    
                  </SubHeading>
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
