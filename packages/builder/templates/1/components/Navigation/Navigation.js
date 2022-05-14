import React, { Fragment } from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { remCalc, withTheme } from "../../utils/style";
import { config } from "../../config";

const AnalyticsMenuItem = withAnalytics(Item);

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
        <AnalyticsMenuItem
          name="logo"
          active
          action="navigation-logo-click"
          href="/"
        >
          <Image
            maxWidth={remCalc(23)}
            alt={content.navigation.logo.alt}
            src={content.navigation.logo.src}
          />
        </AnalyticsMenuItem>
        <MenuMenu position="right">
          {content.navigation.items.map(({ text }) => (
            <AnalyticsMenuItem
              key={text}
              name={text}
              href={config.experiment.comingSoonUrl}
              action={`${text.replace(" ", "-")}-click`.toLowerCase()}
            />
          ))}
        </MenuMenu>
      </Menu>
    </Fragment>
  );
});

export default Navigation;
