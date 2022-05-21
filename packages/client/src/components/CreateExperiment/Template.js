import React, { Fragment } from "react";
import Default from "../../templates/IdeaCamelsDefault";
import { Segment } from "../Styled/Segment";
import { Button } from "../Styled/Button";
import { Message } from "../Styled/Message";
import Billing from "../Billing";
import withModal from "../../hoc/withModal";
import { remCalc } from "../../utils/style";
import {
  onCreate,
  onSetFormIndex,
  onSetNewExperiment,
} from "../../store/actions/experiment";
import { connect } from "../../store";

const BillingModal = withModal(Billing);

const Template = ({
  hasValidCard,
  isCreateLoading,
  createErrorMessage,
  newExperiment: { templateRef = 1, content, theme },
  onSubmit,
  onSetFormIndex,
  onSetNewExperiment,
  history,
}) => {
  if ([templateRef, content, theme].some((o) => !o)) return null;

  const Component = {
    1: Default,
  }[templateRef];

  return (
    <Fragment>
      <Segment padded>
        <Button
          action="template-create-back-click"
          onClick={() => onSetFormIndex(0)}
        >
          Back
        </Button>
        {hasValidCard ? (
          <Button
            positive
            disabled={isCreateLoading}
            loading={isCreateLoading}
            action="create-experiment-form-2-submit-click"
            onClick={(experiment) =>
              onSubmit(experiment, () =>
                history.push(
                  `/home?experiment_ref=${experiment.experiment_ref}`
                )
              )
            }
          >
            Create Experiment
          </Button>
        ) : (
          <BillingModal buttonText="Add Card" modalHeaderText="Add Card" />
        )}

        {createErrorMessage && <Message error>{createErrorMessage}</Message>}
      </Segment>
      <Segment padded maxHeight={remCalc(700)} overflow="hidden auto">
        <Component
          theme={theme}
          content={content}
          onSetExperiment={onSetNewExperiment}
        />
      </Segment>
    </Fragment>
  );
};

export default connect(
  ({
    experiment: { isCreateLoading, createErrorMessage, newExperiment },
    account: { card },
  }) => ({
    hasValidCard: !!card.id,
    isCreateLoading,
    createErrorMessage,
    newExperiment,
  }),
  { onSubmit: onCreate, onSetFormIndex, onSetNewExperiment }
)(Template);
