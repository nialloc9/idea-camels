import React from "react";
import { styled, remCalc } from "../../utils/style";
import SemanticImage from "semantic-ui-react/dist/commonjs/elements/Image";

export const Image = styled(
  ({
    cursor,
    display,
    height,
    width,
    maxWidth,
    margin,
    objectFit,
    ...rest
  }) => <SemanticImage {...rest} />
)`
  ${({ cursor = false }) => cursor && `cursor: ${cursor};`}
  ${({ display = false }) => display && `display: ${display};`}
    ${({ height = false }) => height && `height: ${height};`}
    ${({ width = false }) => width && `width: ${width};`}
    ${({ padding = false }) => padding && `padding: ${padding};`}
    ${({ maxHeight = false }) => maxHeight && `max-height: ${maxHeight};`}
    ${({ maxWidth = false }) =>
    maxWidth && `max-width: ${maxWidth} !important;`}
    ${({ margin = false }) => margin && `margin: ${margin};`}
    ${({ objectFit = false }) => objectFit && `object-fit: ${objectFit};`}
    
    ${({ transition = false }) => transition && `transition: ${transition};`}
    ${({ transition = false }) =>
    transition && `-webkit-transition: ${transition};`}
    ${({ transform = false }) => transform && `-ms-transform: ${transform};`}
    ${({ transform = false }) =>
    transform && `-webkit-transform: ${transform};`}
    ${({ transform = false }) => transform && `transform: ${transform};`}

    &:hover {
    ${({ hoverTransition = false }) =>
      hoverTransition && `transition: ${hoverTransition};`}
    ${({ hoverTransition = false }) =>
      hoverTransition && `-webkit-transition: ${hoverTransition};`}
        ${({ hoverTransform = false }) =>
      hoverTransform && `-ms-transform: ${hoverTransform};`}
        ${({ hoverTransform = false }) =>
      hoverTransform && `-webkit-transform: ${hoverTransform};`}
        ${({ hoverTransform = false }) =>
      hoverTransform && `transform: ${hoverTransform};`}
  }
`;

export const BackgroundImage = styled.section`
  min-height: ${({ height }) => remCalc(height)};
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: ${({ backgroundRepeat }) => backgroundRepeat};
`;
