import { Link as ReactRouterLink } from "react-router-dom";
import { styled } from "../../utils/style";

export const SoftLink = styled(ReactRouterLink)`
  ${({ color = false }) => color && `color: ${color};`}
  ${({ cursor = false }) => cursor && `cursor: ${cursor};`}
    ${({ backgroundColor = false }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
`;

export const Link = styled("a")`
  ${({ color = false }) => color && `color: ${color};`}
  ${({ cursor = false }) => cursor && `cursor: ${cursor};`}
    ${({ fontSize = false }) => fontSize && `font-size: ${fontSize};`}
`;
