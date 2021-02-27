import { remCalc, styled } from "../../../utils/style";

const Container = styled.section`
  min-height: ${({ theme: { block2: { height } } }) => remCalc(height)};
  background-image: url(${({ content: { block2: { image: { src } } } }) => src});
  background-position: center;
  background-repeat: ${({ theme: { block2: { backgroundRepeat } } }) => backgroundRepeat};
`;

export default Container;