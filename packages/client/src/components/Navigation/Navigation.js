import React, { useState, Fragment } from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { Dropdown, DropdownMenu, DropdownItem } from "../Dropdown";
import { Login } from '../Login';
import { SoftLink } from '../Link';
import { Experiments } from './Experiments';
import { remCalc } from "../../utils/style";
import { connect } from "../../store";
import { onLogout } from "../../store/actions/account";
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
          <Login Trigger={({ onClick }) => <AnalyticsMenuItem onClick={onClick} name="login" />}/>
        </MenuMenu>
      </Menu>
    </Fragment>
  );
};

const LoggedIn = ({ theme, logout, experiments, match, isFetchExperimentsLoading }) => {
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
      <Experiments isLoading={isFetchExperimentsLoading} experiments={experiments} match={match} />
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
          onClick={() => { 
            handleItemClick({}, { item: 'logout' });
            logout()
          }}
          action="navigation-logout"
          label="click"
        />
      </MenuMenu>
    </Menu>
  );
};

const mapStateToProps = ({ account: { token }, experiment: { data: experiments, isFetchLoading: isFetchExperimentsLoading } }) => ({ isLoggedIn: token !== "", experiments, isFetchExperimentsLoading });

export default connect(mapStateToProps, { logout: onLogout })(({ isLoggedIn = false, theme = defaultTheme, logout, experiments, ...rest }) =>
isLoggedIn ? <LoggedIn theme={theme} logout={logout} experiments={experiments} {...rest} /> : <NotLoggedIn theme={theme} {...rest} />);
