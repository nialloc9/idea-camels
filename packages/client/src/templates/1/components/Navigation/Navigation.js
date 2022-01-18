import React, { Fragment } from "react";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { EditableText, EditableImage, createImagePreview } from "../Edit";
import { remCalc, withTheme } from "../../utils/style";

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
          <EditableImage
            iconSize="small"
            maxWidth={remCalc(23)}
            alt={content.navigation.logo.alt}
            src={content.navigation.logo.src}
            label=""
            border="none"
            padding={0}
            onSubmit={(file) =>
              onSetExperiment({
                content: {
                  navigation: { logo: { src: createImagePreview(file) } },
                },
                imageFiles: { navigation: { logo: { src: file } } },
              })
            }
          />
        </Item>
        <MenuMenu position="right">
          {content.navigation.items.map(({ text }, i) => (
            <Item key={text} name={text}>
              <EditableText initialText={text} onSubmit={handleTextSubmit(i)} />
            </Item>
          ))}
        </MenuMenu>
      </Menu>
    </Fragment>
  );
});

export default Navigation;
