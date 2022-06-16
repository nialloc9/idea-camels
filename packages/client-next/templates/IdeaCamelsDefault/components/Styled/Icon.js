import React from "react";
import { Icon as SemanticIcon } from "semantic-ui-react";
import { styled } from "../../../../utils/style";

export const Icon = styled(
  ({
    display,
    height,
    width,
    margin,
    color,
    cursor,
    opacity,
    transition,
    hoverTransition,
    hoverTransform,
    hoverOpacity,
    ...rest
  }) => <SemanticIcon {...rest} />
)`
  ${({ display = false }) => display && `display: ${display} !important;`}
  ${({ width = false }) => width && `width: ${width} !important;`}
    ${({ height = false }) => height && `height: ${height} !important;`}
    ${({ margin = false }) => margin && `margin: ${margin} !important;`}
    ${({ color = false }) => color && `color: ${color};`}
    ${({ cursor = false }) => cursor && `cursor: ${cursor};`}
    ${({ opacity = false }) => opacity && `opacity: ${opacity};`}
    ${({ transition = false }) => transition && `transition: ${transition};`}
  
    &:hover {
    ${({ hoverColor = false }) => (hoverColor ? `color: ${hoverColor};` : "")}
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
        ${({ hoverOpacity = false }) =>
      hoverOpacity && `opacity: ${hoverOpacity};`}
  }
`;
