import React, { useState, Fragment } from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { Dropdown, DropdownMenu, DropdownItem } from "../Dropdown";
import { Login } from '../Login';
import { remCalc } from "../../utils/style";
import { items } from "./utils";
import { theme as defaultTheme } from "../../config";

const AnalyticsMenuItem = withAnalytics(Item);

const NotLoggedIn = ({ theme }) => {
  const [{ activeItem }, setState] = useState({ activeItem: "home" });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

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
          active={activeItem === "logo"}
          onClick={handleItemClick}
          action="navigation-logo-click"
          href="/"
        >
          <Image
            maxWidth={remCalc(23)}
            alt="idea camels logo"
            src={theme.logos.main000}
          />
        </AnalyticsMenuItem>
        <MenuMenu position="right">
          {items.map(({ text, href }) => (
            <AnalyticsMenuItem
              key={text}
              name={text}
              href={href}
              active={activeItem === text}
              onClick={handleItemClick}
              action={`${text.replace(" ", "-")}-click`.toLowerCase()}
            />
          ))}
        </MenuMenu>
      </Menu>
      <Login />
    </Fragment>
  );
};

const LoggedIn = ({ theme }) => {
  const [{ activeItem }, setState] = useState({ activeItem: "home" });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  return (
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
        active={activeItem === "logo"}
        onClick={handleItemClick}
        action="navigation-logo-click"
        href="/home"
      >
        <Image
          maxWidth={remCalc(23)}
          alt="idea camels logo"
          src={theme.logos.main000}
        />
      </AnalyticsMenuItem>
      <AnalyticsMenuItem action="navigation-experiments" label="click">
        <Dropdown pointing text="Experiments">
          <DropdownMenu size="mini">
            <DropdownItem>Experiment 1</DropdownItem>
            <DropdownItem>Experiment 2</DropdownItem>
            <DropdownItem>Experiment 3</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </AnalyticsMenuItem>
      <AnalyticsMenuItem
        name="logo"
        active={activeItem === "logo"}
        onClick={handleItemClick}
        action="navigation-experiment-design"
        label="click"
        href="/experiment-design"
      >
        Experiment Design
      </AnalyticsMenuItem>
      <AnalyticsMenuItem
        name="new-experiment"
        active={activeItem === "new-experiment"}
        onClick={handleItemClick}
        action="navigation-new-experiment"
        label="click"
        href="/new-experiment"
      >
        New Experiment
      </AnalyticsMenuItem>
      <MenuMenu position="right">
        <AnalyticsMenuItem
          name="Log Out"
          onClick={() => console.log("SIMULATE LOGOUT")}
          action="navigation-logout"
          label="click"
        />
      </MenuMenu>
    </Menu>
  );
};

export default ({ isLoggedIn = false, theme = defaultTheme }) =>
  isLoggedIn ? <LoggedIn theme={theme} /> : <NotLoggedIn theme={theme} />;
