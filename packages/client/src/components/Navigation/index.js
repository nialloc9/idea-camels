import React, { Component } from "react";
import Navigation from "./Navigation";
import Mobile from "./Mobile";
import { onFetch } from "../../store/actions/experiment";
import { connect } from "../../store";

class Nav extends Component {
  componentDidMount() {
    const { onFetchExperiments } = this.props;

    onFetchExperiments();
  }

  render() {
    return [<Navigation {...this.props} />, <Mobile {...this.props} />];
  }
}

export default connect(() => {}, {
  onFetchExperiments: onFetch,
})(Nav);
