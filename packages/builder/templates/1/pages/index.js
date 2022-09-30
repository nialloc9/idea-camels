import React, { Fragment } from "react";
import Block1 from "../src/components/Home/Block1";
import Block2 from "../src/components/Home/Block2";
import Block3 from "../src/components/Home/Block3";
import Block4 from "../src/components/Home/Block4";
import Block5 from "../src/components/Home/Block5";

const Component = ({ content }) => (
  <Fragment>
    <Block1 content={content} />
    <Block2 content={content} />
    <Block3 content={content} />
    <Block4 content={content} />
    <Block5 content={content} />
  </Fragment>
);

Component.displayName = "Index";

export default Component;
