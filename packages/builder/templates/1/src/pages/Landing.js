import React, { Fragment } from "react";
import withPageAnalytics from "../hoc/withPageAnalytics";
import Block1 from "../components/Home/Block1";
import Block2 from "../components/Home/Block2";
import Block3 from "../components/Home/Block3";
import Block4 from "../components/Home/Block4";
import Block5 from "../components/Home/Block5";

export default withPageAnalytics(({ content }) => (
  <Fragment>
    <Block1 content={content} />
    <Block2 content={content} />
    <Block3 content={content} />
    <Block4 content={content} />
    <Block5 content={content} />
  </Fragment>
));
