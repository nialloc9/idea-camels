import React, { Component, useState } from "react";
import { Menu, Item } from "../Styled/Menu";
import { Block } from "../Styled/Block";
import { Button } from "../Styled/Button";
import { Login } from "../Login";
import { Experiments } from "./Experiments";
import { items } from "./utils";
import withAnalytics from "../../hoc/withAnalytics";
import { connect } from "../../store";
import { onLogout } from "../../store/actions/account";
import { theme as defaultTheme } from "../../config";

const AnalyticsMenuItem = withAnalytics(Item);

const NotLoggedIn = ({ theme }) => {
  const [{ isOpen, activeItem }, setState] = useState({
    activeItem: "home",
    isOpen: false,
  });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

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
          action="navigation-mobile-click"
          label="mobile-button"
        />
      </Item>
      {isOpen &&
        items.map(({ text, href }) => (
          <AnalyticsMenuItem
            key={text}
            name={text}
            active={activeItem === text}
            onClick={handleItemClick}
            action={`${text.replace(" ", "-")}-click`.toLowerCase()}
            href={href}
          >
            <Block textAlign="center" width="100%">
              {text}
            </Block>
          </AnalyticsMenuItem>
        ))}

      {isOpen && (
        <Login
          Trigger={({ onClick }) => (
            <AnalyticsMenuItem
              onClick={onClick}
              name="login"
              action="navigation-login"
            >
              <Block textAlign="center" width="100%">
                Login
              </Block>
            </AnalyticsMenuItem>
          )}
        />
      )}
    </Menu>
  );
};

class LoggedIn extends Component {
  state = {
    activeItem: "home",
    isOpen: false,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleMenuClick = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen, activeItem } = this.state;
    const {
      theme,
      logout,
      experiments,
      match,
      isFetchExperimentsLoading,
    } = this.props;
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
            onClick={this.handleMenuClick}
            icon="align justify"
            backgroundColor={theme.colors.main001}
            color={theme.colors.white000}
            action="navigation-mobile-click"
            label="mobile-button"
          />
        </Item>
        {isOpen && [
          <Experiments
            isLoading={isFetchExperimentsLoading}
            experiments={experiments}
            match={match}
          />,
          <AnalyticsMenuItem
            name="create-experiment"
            active={activeItem === "create-experiment"}
            onClick={this.handleItemClick}
            action="navigation-mobile-click"
            label="create-experiment"
            href="/create-experiment"
          >
            <Block textAlign="center" width="100%">
              Create Experiment
            </Block>
          </AnalyticsMenuItem>,
          <AnalyticsMenuItem
            name="Settings"
            onClick={this.handleItemClick}
            action="navigation-mobile-click"
            label="settings"
            href="/settings"
          >
            <Block textAlign="center" width="100%">
              Settings
            </Block>
          </AnalyticsMenuItem>,
          <AnalyticsMenuItem
            name="Log Out"
            onClick={() => {
              this.handleItemClick({}, { item: "logout" });
              logout();
            }}
            action="navigation-mobile-click"
            label="logout"
          >
            <Block textAlign="center" width="100%">
              Log Out
            </Block>
          </AnalyticsMenuItem>,
        ]}
      </Menu>
    );
  }
}

const mapStateToProps = ({
  account: { token },
  experiment: { data: experiments, isFetchLoading: isFetchExperimentsLoading },
}) => ({ isLoggedIn: token !== "", experiments, isFetchExperimentsLoading });

export default connect(mapStateToProps, {
  logout: onLogout,
})(
  ({
    isLoggedIn = false,
    theme = defaultTheme,
    logout,
    experiments,
    ...rest
  }) =>
    isLoggedIn ? (
      <LoggedIn
        theme={theme}
        logout={logout}
        experiments={experiments}
        {...rest}
      />
    ) : (
      <NotLoggedIn theme={theme} {...rest} />
    )
);
