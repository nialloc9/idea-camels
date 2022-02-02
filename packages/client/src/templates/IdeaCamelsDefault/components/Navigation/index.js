import React from "react";
import Navigation from "./Navigation";
import Mobile from "./Mobile";

export default ({ content, onSetExperiment }) => [
  <Navigation content={content} onSetExperiment={onSetExperiment} />,
  <Mobile content={content} onSetExperiment={onSetExperiment} />,
];
