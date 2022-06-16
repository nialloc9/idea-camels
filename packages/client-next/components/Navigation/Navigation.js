import React, { useState, Fragment, Component } from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { Menu, Item, MenuMenu } from "../Styled/Menu";
import { Image } from "../Styled/Image";
import { Login } from "../Login";
import { Experiments } from "./Experiments";
import { remCalc } from "../../utils/style";
import { connect } from "../../store";
import { onLogout } from "../../store/actions/account";
import { onFetch } from "../../store/actions/experiment";
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
          <Login
            Trigger={({ onClick }) => (
              <AnalyticsMenuItem
                onClick={onClick}
                name="login"
                action="navigation-login"
              />
            )}
          />
        </MenuMenu>
      </Menu>
    </Fragment>
  );
};

class LoggedIn extends Component {
  state = {
    activeItem: "home",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    const { onFetchExperiments } = this.props;

    onFetchExperiments();
  }

  render() {
    const {
      theme,
      logout,
      experiments,
      match,
      isFetchExperimentsLoading,
    } = this.props;

    const { activeItem } = this.state;

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
          onClick={this.handleItemClick}
          action="navigation-click"
          label="logo"
          href="/home"
        >
          <Image
            maxWidth={remCalc(23)}
            alt="idea camels logo"
            src={theme.logos.main000}
          />
        </AnalyticsMenuItem>
        <Experiments
          isLoading={isFetchExperimentsLoading}
          experiments={experiments}
          match={match}
        />
        <AnalyticsMenuItem
          name="create-experiment"
          active={activeItem === "create-experiment"}
          onClick={this.handleItemClick}
          action="navigation-click"
          label="create-experiment"
          href="/create-experiment"
        >
          Create Experiment
        </AnalyticsMenuItem>
        <MenuMenu position="right">
          <AnalyticsMenuItem
            name="Settings"
            onClick={this.handleItemClick}
            action="navigation-click"
            label="settings"
            href="/settings"
          />
          <AnalyticsMenuItem
            name="Log Out"
            onClick={() => {
              this.handleItemClick({}, { item: "logout" });
              logout();
            }}
            action="navigation-click"
            label="logout"
          />
        </MenuMenu>
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
  onFetchExperiments: onFetch,
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
