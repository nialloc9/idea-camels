import React, { useState } from "react";
import { Menu, Item } from "../Styled/Menu";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { withTheme } from "../../utils/style";

export default withTheme(({ theme, content }) => {
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
        />
      </Item>
      {isOpen &&
        content.navigation.items.map(({ text }) => (
          <Item
            key={text}
            name={text}
            active={activeItem === text}
          >
            <Block textAlign="center" width="100%">
              {text}
            </Block>
          </Item>
        ))}
    </Menu>
  );
});
