import React from "react";
import Navigation from "./Navigation";
import Mobile from "./Mobile";
import withEditable from "../../hoc/withEditable";

export default withEditable(({ theme }) => [
  <Navigation theme={theme} />,
  <Mobile theme={theme} />,
]);
