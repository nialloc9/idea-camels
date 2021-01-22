import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router';
import Navigation from "../Navigation";
import {connect} from '../../store';
import {onReAuthAccount} from '../../store/actions/account';
import {withLoader} from '../../hoc/withLoader';

export class PrivateRoute extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        onFetchAuthorisedUser: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        permissions: PropTypes.arrayOf(PropTypes.number).isRequired,
        exact: PropTypes.bool,
        token: PropTypes.string,
        location: PropTypes.object,
    };

    static defaultProps = {
        exact: false,
        location: {},
        requiredPermissions: [],
        token: ''
    };

    componentDidMount() {
        const {token, onReAuth} = this.props;

        token !== '' && onReAuth(token);
    }

    render() {
        const {
            component: Component,
            exact,
            path,
            token,
        } = this.props;
        
        const LoadingComponent = withLoader(Component);

        return (
            <Route
                exact={exact}
                path={path}
                render={props =>
                    token !== '' ? (
                        <Fragment><Navigation {...props} /><Component /></Fragment>
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {from: props.location},
                            }}
                        />
                    )
                }
            />
        );
    }
}

/**
 * @param token
 * @returns {{token: *}}
 */
const mapStateToProps = ({ account: { token } }) => ({token});

export default connect(mapStateToProps, { onReAuth: onReAuthAccount })(PrivateRoute);
