import SemanticInput from "semantic-ui-react/dist/commonjs/elements/Input";
import { styled } from "../../utils/style";

export const Input = styled(SemanticInput)`
    ${({ width = false }) => width && `width: ${width};`}
    ${({ maxWidth = false }) => maxWidth && `max-width: ${maxWidth};`}  
`;
