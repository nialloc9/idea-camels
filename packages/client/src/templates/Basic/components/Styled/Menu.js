import React from "react";
import SemanticMenu from "semantic-ui-react/dist/commonjs/collections/Menu";
import { styled, createMediaQuery } from "../../../../utils/style";

const SemanticItem = SemanticMenu.Item;

export const MenuMenu = SemanticMenu.Menu;

export const Menu = styled(
  ({
    fontSize,
    color,
    anchorColor,
    backgroundColor,
    mobileDisplay,
    display,
    height,
    mobileHeight,
    ...rest
  }) => <SemanticMenu {...rest} />
)`
  ${({ fontSize = false }) => fontSize && `font-size: ${fontSize};`}
  ${({ backgroundColor = false }) =>
    backgroundColor && `background-color: ${backgroundColor} !important;`}
    ${({ fontFamily = false }) =>
    fontFamily && `font-family: ${fontFamily} !important;`}
    ${({ height = false }) => height && `height: ${height};`}
    
    ${({ margin = 0 }) => `margin: ${margin} !important;`}
    
    ${({ display = false }) => display && `display: ${display} !important;`}

    a {
    ${({ anchorColor = false }) =>
      anchorColor && `color: ${anchorColor} !important;`}
  }

  ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
    ${({ tabletDisplay = "flex" }) => `display: ${tabletDisplay} !important;;`}
  }
`;

export const Item = styled(
  ({
    padding,
    margin,
    color,
    cursor,
    mobileDisplay,
    backgroundColor,
    hoverBackgroundColor,
    ...rest
  }) => <SemanticItem {...rest} />
)`
  ${({ padding = false }) => padding && `padding: ${padding};`}
  ${({ margin = false }) => margin && `margin: ${margin};`}
    ${({ color = false }) => color && `color: ${color};`}
    ${({ cursor = false }) => cursor && `cursor: ${cursor};`}
    ${({ backgroundColor = false }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
    ${({ height = false }) => height && `height: ${height};`}

    &:hover {
    ${({ hoverBackgroundColor = false }) =>
      hoverBackgroundColor && `background-color: ${hoverBackgroundColor};`}
  }
`;
