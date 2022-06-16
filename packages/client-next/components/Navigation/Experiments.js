import React from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { Item } from "../Styled/Menu";
import { DropdownMenu, Dropdown, DropdownItem } from "../Dropdown";
import { Loader } from "../Loader";
import { SoftLink } from "../Link";

const AnalyticsMenuItem = withAnalytics(Item);
const AnalyticsSoftLink = withAnalytics(SoftLink);

export const Experiments = ({ experiments, match = {}, isLoading }) => {
  if (isLoading) {
    return (
      <Item>
        <Loader size="mini" />
      </Item>
    );
  }

  if (experiments.length === 0) return null;

  const { params: { experimentId } = {} } = match;

  const experimentText =
    experimentId && experiments.length > 0
      ? experiments.find(
          ({ experiment_ref }) => experiment_ref === parseInt(experimentId)
        ).name
      : "Experiments";

  return (
    <AnalyticsMenuItem action="navigation-click" label="experiments">
      <Dropdown text={experimentText} margin="auto">
        <DropdownMenu size="mini">
          {experiments.map(({ experiment_ref, name }) => (
            <AnalyticsSoftLink
              action="navigation-click"
              label="experiment"
              to={`/home?experiment_ref=${experiment_ref}`}
            >
              <DropdownItem key={`experiment-${experiment_ref}`}>
                {name}
              </DropdownItem>
            </AnalyticsSoftLink>
          ))}
        </DropdownMenu>
      </Dropdown>
    </AnalyticsMenuItem>
  );
};
