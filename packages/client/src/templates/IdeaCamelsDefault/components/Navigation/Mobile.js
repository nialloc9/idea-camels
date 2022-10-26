import React, { useState } from "react";
import { Menu, Item } from "../Styled/Menu";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { withTheme } from "../../../../utils/style";

import withEditableText from "../../../common/withEditableText";

const EditableText = withEditableText("div");

export default withTheme(({ theme, content, onSetExperiment }) => {
  const [{ isOpen, activeItem }, setState] = useState({
    activeItem: "home",
    isOpen: false,
  });

  const handleMenuClick = () => setState({ isOpen: !isOpen });

  const handleTextSubmit = (index) => (value) => {
    const items = [...content.navigation.items];
    items[index] = { ...items[index], text: value };
    onSetExperiment({ content: { navigation: { items } } });
  };

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
          action="navigation-mobile-menu-button-click"
          color={theme.colors.white000}
        />
      </Item>
      {isOpen &&
        content.navigation.items.map(({ text }, i) => (
          <Item key={text} name={text} active={activeItem === text}>
            <Block textAlign="center" width="100%">
              <EditableText
                action="template-mobile-edit-navigation-click"
                label={text.toLowerCase().split(" ").join("-")}
                initialText={text}
                onSubmit={handleTextSubmit(i)}
              />
            </Block>
          </Item>
        ))}
    </Menu>
  );
});
