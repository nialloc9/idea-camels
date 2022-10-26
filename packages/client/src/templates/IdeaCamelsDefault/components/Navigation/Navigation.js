import React, { Fragment } from "react";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { remCalc, withTheme } from "../../../../utils/style";
import EditableImageContainer from "../../../common/EditableImageContainer";
import withEditableText from "../../../common/withEditableText";

const EditableText = withEditableText("div");

const Navigation = withTheme(({ theme, content, onSetExperiment }) => {
  const handleTextSubmit = (index) => (value) => {
    const items = [...content.navigation.items];
    items[index] = { ...items[index], text: value };
    onSetExperiment({ content: { navigation: { items } } });
  };

  return (
    <Fragment>
      <Menu
        display="none"
        secondary
        size="huge"
        backgroundColor={theme.colors.main000}
        color={theme.colors.white000}
        anchorColor={theme.colors.white000}
        fontFamily={theme.defaultFont.fontFamily}
      >
        <Item name="logo" active>
          <EditableImageContainer
            component={Image}
            iconSize="tiny"
            maxWidth={remCalc(23)}
            alt={content.navigation.logo.alt}
            src={content.navigation.logo.src}
            action="template-navigation-edit-click"
            label="logo"
            labelText=""
            border="none"
            padding={0}
            onSubmit={(url) =>
              onSetExperiment({
                content: {
                  navigation: { logo: { src: url } },
                },
              })
            }
          />
        </Item>
        <MenuMenu position="right">
          {content.navigation.items.map(({ text }, i) => (
            <Item key={text} name={text}>
              <EditableText
                action="template-edit-navigation-click"
                label={text.toLowerCase().split(" ").join("-")}
                color={theme.colors.white000}
                anchorColor={theme.colors.white000}
                initialText={text}
                onSubmit={handleTextSubmit(i)}
              />
            </Item>
          ))}
        </MenuMenu>
      </Menu>
    </Fragment>
  );
});

export default Navigation;
