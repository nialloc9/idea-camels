import React from "react";
import { Icon } from "../Styled/Icon";
import withToolTip from "../../hoc/withToolTip";

const ToolTipIcon = withToolTip(Icon);

export const Label = ({ fontWeight = 80, label, info = "" }) => (
  <label fontWeight={fontWeight}>
    {label}
    {info !== "" && (
      <ToolTipIcon name="info circle" tooltip={info} color="orange" />
    )}
  </label>
);
