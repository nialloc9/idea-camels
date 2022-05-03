import { Dropdown as DD } from "semantic-ui-react";
import { styled, createMediaQuery } from "../../../../utils/style";

export const Dropdown = styled(DD)`
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ display }) => display && `display: ${display} !important;`}

    ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
    ${({ tabletMargin = false }) => tabletMargin && `margin: ${tabletMargin};`}

    ${({ tabletDisplay }) =>
      tabletDisplay && `display: ${tabletDisplay} !important;`}
  }
`;
