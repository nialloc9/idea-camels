import React from "react";
import { styled, createMediaQuery } from "../../utils/style";
import withAnalytics from "../../hoc/withAnalytics";
import SemanticButton from "semantic-ui-react/dist/commonjs/elements/Button";

export const Button = withAnalytics(styled(
  ({ backgroundColor, color, display, margin, top, ...rest }) => (
    <SemanticButton {...rest} />
  )
)`
  ${({ backgroundColor = false }) =>
    backgroundColor && `background-color: ${backgroundColor} !important;`}
  ${({ color = false }) => color && `color: ${color} !important;`}
  ${({
    display = false,
  }) => display && `display: ${display} !important;`}
  ${({ margin = false }) =>
    margin && `margin: ${margin} !important;`}
  ${({ top = false }) =>
    top && `top: ${top} !important;`}
  ${({ width = false }) =>
    width && `width: ${width} !important;`}

  ${({ theme: { breakpoints } }) =>
    createMediaQuery(breakpoints.tablet)} {
    ${({ tabletWidth = false }) =>
      tabletWidth && `width: ${tabletWidth} !important;`}
  }

  &:hover {
    filter: brightness(0.96);
  }
`);