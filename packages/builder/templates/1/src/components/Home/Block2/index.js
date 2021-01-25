import { remCalc, styled } from "../../../utils/style";
import {content} from '../../../config'

const { block2: { image: { src, } } } = content;

const Container = styled.section`
  min-height: ${({ theme: { block2: { height } } }) => remCalc(height)};
  background-image: url(${src});
  background-position: center;
  background-repeat: ${({ theme: { block2: { backgroundRepeat } } }) => backgroundRepeat};
`;

export default Container;