import { styled, remCalc } from "../../../../utils/style";

export { Image, ImageGroup } from "semantic-ui-react";

export const BackgroundImage = styled.section`
  min-height: ${({
    theme: {
      block2: { height },
    },
  }) => remCalc(height)};
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: ${({
    theme: {
      block2: { backgroundRepeat },
    },
  }) => backgroundRepeat};
`;
