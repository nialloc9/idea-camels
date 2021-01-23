import React, { Fragment } from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
} from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Button } from "../../Button";
import Carausel from "./Carousel";
import {theme, content} from '../../../config'

const { block5: { height, paddings, backgroundColor, fontFamily, card, quoteContainerPaddings, quote, author, button } } = theme;

const Container = styled.section`
  min-height: ${remCalc(height)};
  padding: ${getMarginsOrPaddings(paddings)};
  background-color: ${backgroundColor};
  font-family: ${fontFamily};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: ${remCalc(card.width)};
`;

const QuoteContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: ${getMarginsOrPaddings(quoteContainerPaddings)};
`;

const Quote = styled.h1`
  display: block;
  font-size: ${remCalc(quote.size)};
  font-weight: ${quote.weight};
  line-height: ${remCalc(quote.lineHeight)};
`;

const Author = styled.p`
  display: block;
  font-size: ${remCalc(author.size)};
  color: ${author.color};
  font-weight: ${({
    theme: {
      block5: { author },
    },
  }) => author.weight};
  line-height: ${remCalc(author.lineHeight)};
  margin: ${getMarginsOrPaddings(author.margins)};
`;

const ButtonContainer = styled.div`
  margin: ${getMarginsOrPaddings(button.margins)};
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: ${button.backgroundColor} !important;
  color: ${button.color} !important;
`;

const AnalyticsButton = withAnalytics(StyledButton);

export default () => (
  <Fragment>
      <Carausel />
      <Container>
        <InnerContainer>
          <QuoteContainer>
            <Quote>
              {content.block5.quote.text}
            </Quote>
            <Author>- {content.block5.author.text}</Author>
          </QuoteContainer>
          <ButtonContainer>
            <AnalyticsButton
              href="/coming-soon"
              size={button.size}
              action="block5-button"
            >
              {content.block5.button.text}
            </AnalyticsButton>
          </ButtonContainer>
        </InnerContainer>
      </Container>
    </Fragment>
)
