import React from "react";
import ReactDOM from "react-dom";
import { config } from './config'

console.log("============= TEST CONFIG =============");
console.log(config);
console.log("============= TEST CONFIG =============");
ReactDOM.render(
  <React.StrictMode>
    <div>test</div>
  </React.StrictMode>,
  document.getElementById("root")
);
