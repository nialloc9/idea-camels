import React, { Component } from "react";
import Navigation from "./Navigation";
import Mobile from "./Mobile";

export default class Nav extends Component {
  render() {
    return [<Navigation {...this.props} />, <Mobile {...this.props} />];
  }
}
