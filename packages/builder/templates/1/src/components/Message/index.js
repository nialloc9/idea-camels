import { Message as SemanticMessage } from "semantic-ui-react";
import { styled } from "../../utils/style";

export const Message = styled(SemanticMessage)`
  text-align: ${({ theme }) => theme.infoMessage.textAlign};
`;
