import React from "react";
import { styled, remCalc } from "../utils/style";
import { Icon } from "../components/Styled/Icon";

const EditableContainer = styled.div`
  border-style: dotted;
  border-width: ${remCalc(3)};
  position: relative;
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
`;

export default (WrappedComponent) => ({
  editButtonSize = "large",
  editButtonTop = remCalc(10),
  editButtonRight = remCalc(10),
  ...rest
}) =>
  !rest.isEditable ? (
    <WrappedComponent {...rest} />
  ) : (
    <EditableContainer>
      <WrappedComponent {...rest} />
      <ControlsContainer top={editButtonTop} right={editButtonRight}>
        <Icon
          name="edit"
          cursor="pointer"
          opacity="0.1 !important"
          hoverOpacity="1 !important"
          transition="0.5s"
          size={editButtonSize}
        />
      </ControlsContainer>
    </EditableContainer>
  );