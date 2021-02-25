import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import {connect} from '../../store';

export class OpenRoute extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    token: PropTypes.string,
    pathname: PropTypes.string,
    exact: PropTypes.bool,
    location: PropTypes.object,
  };

  static defaultProps = {
    token: '',
    exact: false,
    pathname: '/home',
    location: {},
  };

  get pathname () {
    const {pathname, location: {state}} = this.props;

    if (state && state.from) {
      return state.from.pathname || pathname;
    }

    return pathname;
  }

  render () {
    const {component: Component, exact, path, token, location} = this.props;

    return (
      <Route
        exact={exact}
        path={path}
        render={props =>
            token === ''
            ? <Fragment><Navigation {...props} /><Component {...props} /></Fragment>
            : <Redirect
                to={{
                  pathname: this.pathname,
                  state: {from: location},
                }}
              />}
      />
    );
  }
}

/**
 * @param token
 * @returns {{token: *}}
 */
const mapStateToProps = ({account: {token}}) => ({
    token,
});

export default connect (mapStateToProps) (OpenRoute);
