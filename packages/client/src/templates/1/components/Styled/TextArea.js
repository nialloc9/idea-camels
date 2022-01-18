import { TextArea as SemanticTextArea } from "semantic-ui-react";
import { styled } from "../../utils/style";

export const TextArea = styled(SemanticTextArea)`
  ${({ width = false }) => width && `width: ${width};`}
  ${({ maxWidth = false }) => maxWidth && `max-width: ${maxWidth};`}
`;
