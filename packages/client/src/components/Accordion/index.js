import React, { useState, Fragment } from "react";
import { Accordion as SemanticAccordion, Icon } from "semantic-ui-react";
import withAnalytics from "../../hoc/withAnalytics";

const AnalyticsTitle = withAnalytics(SemanticAccordion.Title);

const Accordion = ({
  fluid = true,
  styled = true,
  data = [],
  action,
  onClick,
}) => {
  const [activeIndex, onSetIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    onSetIndex(newIndex);

    if (onClick) {
      onClick(titleProps);
    }
  };

  return (
    <SemanticAccordion fluid={fluid} styled={styled}>
      {data.map(({ title, content, trackingLabel, icon }, index) => (
        <Fragment key={title}>
          <AnalyticsTitle
            index={index}
            active={activeIndex === index}
            action={action}
            label={trackingLabel}
            onClick={handleClick}
          >
            {icon && <Icon name={icon} />}
            {title}
          </AnalyticsTitle>
          <SemanticAccordion.Content active={activeIndex === index}>
            {content}
          </SemanticAccordion.Content>
        </Fragment>
      ))}
    </SemanticAccordion>
  );
};

export default Accordion;
