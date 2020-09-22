import React from "react";
import { remCalc, styled } from "../../../utils/style";
import withEditable from "../../../hoc/withEditable";

const Container = styled.section`
  min-height: ${({
    theme: {
      block2: { height },
    },
  }) => remCalc(height)};
  background-image: url(${({
    theme: {
      block2: { image },
    },
  }) => image});
  background-position: center;
  background-repeat: ${({
    theme: {
      block2: { backgroundRepeat = "no-repeat" },
    },
  }) => backgroundRepeat};
`;

export default withEditable(() => <Container />);
