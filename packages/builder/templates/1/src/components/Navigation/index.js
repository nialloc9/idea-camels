import React from "react";
import Navigation from "./Navigation";
import Mobile from "./Mobile";

export default ({ content }) => [
  <Navigation content={content} />,
  <Mobile content={content} />,
]
