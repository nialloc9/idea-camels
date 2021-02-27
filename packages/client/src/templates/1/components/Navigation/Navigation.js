import React, { Fragment } from "react";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { remCalc, withTheme } from "../../utils/style";

const Navigation = withTheme(({ theme, content }) => {

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
        <Item
          name="logo"
          active
        >
          <Image
            maxWidth={remCalc(23)}
            alt={content.navigation.logo.alt}
            src={theme.logos.main000}
          />
        </Item>
        <MenuMenu position="right">
          {content.navigation.items.map(({ text }) => (
            <Item
              key={text}
              name={text}
            />
          ))}
        </MenuMenu>
      </Menu>
    </Fragment>
  );
});

export default Navigation
