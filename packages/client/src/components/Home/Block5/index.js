import React, { Fragment } from "react";
import {
  remCalc,
  styled,
  withTheme,
  getMarginsOrPaddings,
} from "../../../utils/style";
import { Button } from "../../Styled/Button";
import Carausel from "./Carousel";

const Section = styled.section`
  margin: ${remCalc(40)} 0 0 0;
`;
const Container = styled.section`
  min-height: ${({
    theme: {
      block5: { height },
    },
  }) => remCalc(height)};
  padding: ${remCalc(40)} 0;
  background-color: ${({
    theme: {
      block5: { backgroundColor },
    },
  }) => backgroundColor};
  font-family: ${({
    theme: {
      block5: { fontFamily },
    },
  }) => fontFamily};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: ${({ theme: { block5 } }) => remCalc(block5.card.width)};
`;

const QuoteContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: ${({ theme: { block5 } }) =>
    getMarginsOrPaddings(block5.quoteContainerPaddings)};
`;

const Quote = styled.h1`
  display: block;
  font-size: ${({
    theme: {
      block5: { quote },
    },
  }) => remCalc(quote.size)};
  font-weight: ${({
    theme: {
      block5: { quote },
    },
  }) => quote.weight};
  line-height: ${({
    theme: {
      block5: { quote },
    },
  }) => remCalc(quote.lineHeight)};
`;

const Author = styled.p`
  display: block;
  font-size: ${({
    theme: {
      block5: { author },
    },
  }) => remCalc(author.size)};
  color: ${({
    theme: {
      block5: { author },
    },
  }) => author.color};
  font-weight: ${({
    theme: {
      block5: { author },
    },
  }) => author.weight};
  line-height: ${({
    theme: {
      block5: { author },
    },
  }) => remCalc(author.lineHeight)};
  margin: ${({
    theme: {
      block5: { author },
    },
  }) => getMarginsOrPaddings(author.margins)};
`;

const ButtonContainer = styled.div`
  margin: ${({
    theme: {
      block5: { button },
    },
  }) => getMarginsOrPaddings(button.margins)};

  display: flex;
  justify-content: center;
`;

export default withTheme(({ theme: { block5 } }) => (
  <Section>
    <Carausel />
    <Container>
      <InnerContainer>
        <QuoteContainer>
          <Quote>
            "Gut feelings have no place in a world where data driven assumptions
            can be made."
          </Quote>
          <Author>- Tim Ford, Marketing Director</Author>
        </QuoteContainer>
        <ButtonContainer>
          <Button
            href="/sign-up"
            size={block5.button.size}
            action="join-us-click"
            label="block5"
          >
            JOIN US
          </Button>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  </Section>
));
