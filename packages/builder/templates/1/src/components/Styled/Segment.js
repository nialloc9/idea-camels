import React from "react";
import { Segment as Seg } from "semantic-ui-react";
import { styled } from "../../utils/style";

export const Segment = styled(({ height, ...rest }) => <Seg {...rest} />)`
  ${({ height }) => height && `height: ${height};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
`;
