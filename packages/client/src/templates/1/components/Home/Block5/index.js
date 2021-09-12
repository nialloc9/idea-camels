import React, { Fragment } from "react";
import {
  remCalc,
  styled,
  getMarginsOrPaddings,
  withTheme
} from "../../../utils/style";
import { Button } from "../../Button";
import Carausel from "./Carousel";
import { EditableText, EditableImage, EditableButton, createImagePreview } from "../../Edit";

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

export default withTheme(({ theme: { block5: { button } }, content, onSetExperiment }) => (
  <Fragment>
      <Carausel content={content} onSetExperiment={onSetExperiment} />
      <Container>
        <InnerContainer>
          <QuoteContainer>
            <Quote>
              <EditableText initialText={content.block5.quote.text} onSubmit={text => onSetExperiment({ content: { block5: { quote: { text } } } })} />
            </Quote>
            <Author>- <EditableText initialText={content.block5.author.text} onSubmit={text => onSetExperiment({ content: { block5: { author: { text } } } })} /></Author>
          </QuoteContainer>
          <ButtonContainer>
            <EditableButton
              color={button.color}
              size={button.size}
              basic
              backgroundColor={button.backgroundColor}
              initialText={content.block5.button.text}
              onSubmit={text => onSetExperiment({ content: { block5: { button: { text } } } })}
            />
          </ButtonContainer>
        </InnerContainer>
      </Container>
    </Fragment>
))