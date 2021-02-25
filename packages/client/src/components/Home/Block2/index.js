import { remCalc, styled } from "../../../utils/style";

export default styled.section`
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
