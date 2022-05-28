/**
 * @description decides what message to show
 */
export const getExperimentNotSelectedMessage = ({ experiments = [] }) =>
  experiments.length > 0
    ? "Please select or create an experiment to get started."
    : "Please create an experiment to get started.";
