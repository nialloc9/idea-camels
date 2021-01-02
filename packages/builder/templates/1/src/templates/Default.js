import React, { Fragment } from "react";
import Block1 from "../components/Home/Block1";
import Block2 from "../components/Home/Block2";
import Block3 from "../components/Home/Block3";
import Block4 from "../components/Home/Block4";
import Block5 from "../components/Home/Block5";

export default ({ isEditable = false }) => (
  <Fragment>
    <Block1 isEditable={isEditable} />
    <Block2 isEditable={isEditable} />
    <Block3 isEditable={isEditable} />
    <Block4 isEditable={isEditable} />
    <Block5 isEditable={isEditable} />
  </Fragment>
);
