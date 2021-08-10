import React, { Fragment } from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
  withTheme
} from "../../../utils/style";
import withAnalytics from "../../../hoc/withAnalytics";
import { Button } from "../../Button";
import Carausel from "./Carousel";

const Container = styled.section`
  min-height: ${({ theme: { block5: { height } } }) => remCalc(height)};
  padding: ${({ theme: { block5: { paddings } } }) => getMarginsOrPaddings(paddings)};
  background-color: ${({ theme: { block5: { backgroundColor } } }) => backgroundColor};
  font-family: ${({ theme: { block5: { fontFamily } } }) => fontFamily};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: ${({ theme: { block5: { card } } }) => remCalc(card.width)};
`;

const QuoteContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: ${({ theme: { block5: { quoteContainerPaddings } } }) => getMarginsOrPaddings(quoteContainerPaddings)};
`;

const Quote = styled.h1`
  display: block;
  font-size: ${({ theme: { block5: { quote } } }) => remCalc(quote.size)};
  font-weight: ${({ theme: { block5: { quote } } }) => quote.weight};
  line-height: ${({ theme: { block5: { quote } } }) => remCalc(quote.lineHeight)};
`;

const Author = styled.p`
  display: block;
  font-size: ${({ theme: { block5: { author } } }) => remCalc(author.size)};
  color: ${({ theme: { block5: { author } } }) => author.color};
  font-weight: ${({
    theme: {
      block5: { author },
    },
  }) => author.weight};
  line-height: ${({ theme: { block5: { author } } }) => remCalc(author.lineHeight)};
  margin: ${({ theme: { block5: { author } } }) => getMarginsOrPaddings(author.margins)};
`;

const ButtonContainer = styled.div`
  margin: ${({ theme: { block5: { button } } }) => getMarginsOrPaddings(button.margins)};
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme: { block5: { button } } }) => button.backgroundColor} !important;
  color: ${({ theme: { block5: { button } } }) => button.color} !important;
`;

const AnalyticsButton = withAnalytics(StyledButton);

export default withTheme(({ theme: { block5: { button } }, content }) => (
  <Fragment>
      <Carausel content={content} />
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
))
