import React from "react";
import Default from "../../templates/IdeaCamelsDefault";
import { Segment } from "../Styled/Segment";
import { remCalc } from "../../utils/style";
import { onCreate } from "../../store/actions/experiment";
import { connect } from "../../store";

const Template = ({
  newExperiment: { templateRef = 1, content, theme },
  onSubmit,
}) => {
  if ([templateRef, content, theme].some((o) => !o)) return null;

  const Component = {
    1: Default,
  }[templateRef];

  return (
    <Segment padded maxHeight={remCalc(700)} overflow="hidden auto">
      <Component theme={theme} content={content} onSetExperiment={onSubmit} />
    </Segment>
  );
};

export default connect(
  ({ experiment: { newExperiment } }) => ({
    newExperiment,
  }),
  { onSubmit: onCreate }
)(Template);
