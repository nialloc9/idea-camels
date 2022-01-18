import React from "react";
import { Loader as SemanticLoader } from "semantic-ui-react";
import { Block } from "../Styled/Block";

export const Loader = ({
  size,
  inline,
  width = "100%",
  height = "100%",
  textAlign = "center",
}) => (
  <Block width={width} height={height} textAlign={textAlign}>
    <SemanticLoader size={size} inline={inline} active />
  </Block>
);
