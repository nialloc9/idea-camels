import { styled } from "../../utils/style";

export const Section = styled.section`
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ display }) => display && `display: ${display};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ justifyDirection }) => justifyDirection && `justify-direction: ${justifyDirection};`}
`;