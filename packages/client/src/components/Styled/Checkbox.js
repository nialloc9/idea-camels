import {Checkbox as SemanticCheckbox} from "semantic-ui-react";
import { styled } from "../../utils/style";

export const Checkbox = styled(SemanticCheckbox)`
    ${({ margin = false }) => margin && `margin: ${margin};`}
`;