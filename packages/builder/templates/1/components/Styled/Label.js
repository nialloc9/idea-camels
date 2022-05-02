import React from "react";
import { styled, remCalc } from "../../utils/style";

const StyledLabel = styled.label`
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;

export const Label = ({ fontWeight = 800 }) => (
  <label fontWeight={800}>
    {label}
    {info !== "" && (
      <ToolTipIcon name="info circle" tooltip={info} color="orange" />
    )}
  </label>
);
