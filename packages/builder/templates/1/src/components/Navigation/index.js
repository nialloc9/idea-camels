import React from "react";
import Navigation from "./Navigation";
import Mobile from "./Mobile";

const Nav = ({ content }) => [
  <Navigation key="navigation" content={content} />,
  <Mobile key="mobile" content={content} />,
];

Nav.displayName = "Navigation";

export default Nav;
