import { remCalc, styled } from "../../../utils/style";
import {theme, content} from '../../../config'

const { block2: { height, backgroundRepeat } } = theme;
const { block2: { image: { src, } } } = content;

const Container = styled.section`
  min-height: ${remCalc(height)};
  background-image: url(${src});
  background-position: center;
  background-repeat: ${backgroundRepeat};
`;

export default Container;