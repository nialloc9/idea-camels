import React, { Fragment } from "react";
import Default from "../../templates/IdeaCamelsDefault";
import Crm from "../../templates/Crm";
import { Segment } from "../Styled/Segment";
import { Button } from "../Styled/Button";
import { Message } from "../Styled/Message";
import Billing from "../Billing";
import EditTemplate from "./EditTemplate";
import withModal from "../../hoc/withModal";
import { remCalc } from "../../utils/style";
import {
  onCreate,
  onSetFormIndex,
  onSetNewExperiment,
} from "../../store/actions/experiment";
import { connect } from "../../store";
import { history } from "../../store/middleware/history";

const BillingModal = withModal(Billing);

const Template = ({
  hasValidCard,
  isCreateLoading,
  createErrorMessage,
  newExperiment: { templateRef = 1, content, theme },
  onSubmit,
  onSetFormIndex,
  onSetNewExperiment,
}) => {
  if ([templateRef, content, theme].some((o) => !o)) return null;

  const Component = {
    1: Default,
    2: Crm,
  }[templateRef];

  return (
    <Fragment>
      <Segment>
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
              onClick={() =>
                onSubmit((experiment) =>
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
        <EditTemplate />
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
    hasValidCard: !!card?.id,
    isCreateLoading,
    createErrorMessage,
    newExperiment,
  }),
  { onSubmit: onCreate, onSetFormIndex, onSetNewExperiment }
)(Template);
