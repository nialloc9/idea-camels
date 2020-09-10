import React, { Fragment } from "react";
import Block1 from "../components/Home/Block1";
import Block2 from "../components/Home/Block2";
import Block3 from "../components/Home/Block3";
import Block4 from "../components/Home/Block4";
import Block5 from "../components/Home/Block5";
import withPageAnalytics from "../hoc/withPageAnalytics";

export default withPageAnalytics(() => (
  <Fragment>
    <Block1 />
    <Block2 />
    <Block3 />
    <Block4 />
    <Block5 />
  </Fragment>
));
