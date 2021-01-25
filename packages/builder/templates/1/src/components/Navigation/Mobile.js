import React, { useState } from "react";
import { Menu, Item } from "../Styled/Menu";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { content } from "../../config";
import { withTheme } from "../../utils/style";
import withAnalytics from "../../hoc/withAnalytics";

const AnalyticsMenuItem = withAnalytics(Item);

export default withTheme(({ theme }) => {
  const [{ isOpen, activeItem }, setState] = useState({
    activeItem: "home",
    isOpen: false,
  });

  const handleMenuClick = () => setState({ isOpen: !isOpen });

  return (
    <Menu
      secondary
      size="huge"
      stackable
      backgroundColor={theme.colors.main000}
      color={theme.colors.white000}
      anchorColor={theme.colors.white000}
      fontFamily={theme.defaultFont.fontFamily}
      tabletDisplay="none"
    >
      <Item>
        <Button
          fluid
          onClick={handleMenuClick}
          icon="align justify"
          backgroundColor={theme.colors.main001}
          color={theme.colors.white000}
          action="navigation-mobile-button"
          label="click"
        />
      </Item>
      {isOpen &&
        content.navigation.items.map(({ text, href }) => (
          <AnalyticsMenuItem
            key={text}
            name={text}
            active={activeItem === text}
            action={`${text.replace(" ", "-")}-click`.toLowerCase()}
            href={href}
          >
            <Block textAlign="center" width="100%">
              {text}
            </Block>
          </AnalyticsMenuItem>
        ))}
    </Menu>
  );
});
