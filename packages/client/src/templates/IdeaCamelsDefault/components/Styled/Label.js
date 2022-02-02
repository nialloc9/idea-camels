import React from "react";
import { styled } from "../../../../utils/style";

const StyledLabel = styled.label`
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
  ${({ cursor }) => cursor && `cursor: ${cursor};`}
`;

export const Label = ({ label = "", ...rest }) =>
  label !== "" && <StyledLabel {...rest}>{label}</StyledLabel>;
