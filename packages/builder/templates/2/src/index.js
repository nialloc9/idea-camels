import React from "react";
import ReactDOM from "react-dom";
import {config, content, theme} from './config'

console.log("============= TEST CONFIG =============");
console.log(config);
console.log("============= TEST CONFIG =============");
console.log("============= TEST CONTENT =============");
console.log(content);
console.log("============= TEST CONTENT =============");
console.log("============= TEST THEME =============");
console.log(theme);
console.log("============= TEST THEME =============");
ReactDOM.render(
  <React.StrictMode>
    <div>Template 2</div>
  </React.StrictMode>,
  document.getElementById("root")
);
