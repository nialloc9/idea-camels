import React from "react";
import { ToolTipIcon } from "semantic-ui-react";

export const Label = ({ fontWeight = 800, label, info = "" }) => (
  <label fontWeight={fontWeight}>
    {label}
    {info !== "" && (
      <ToolTipIcon name="info circle" tooltip={info} color="orange" />
    )}
  </label>
);
