import { Message as SemanticMessage } from "semantic-ui-react";
import { styled } from "../../utils/style";
import theme from "../../config/theme";

export const Message = styled(SemanticMessage)`
  text-align: ${() => theme.infoMessage.textAlign};
`;
