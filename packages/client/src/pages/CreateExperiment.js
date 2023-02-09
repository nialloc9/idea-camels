import React, { Component } from "react";
import { Grid, GridRow } from "../components/Grid";
import Create from "../components/CreateExperiment/Create";
import { Block } from "../components/Styled/Block";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";

class CreateExperiment extends Component {
  render() {
    return (
      <Block minHeight={remCalc(500)}>
        <Grid padded centered stackable>
          <GridRow columns={6}>
            <Create />
          </GridRow>
        </Grid>
      </Block>
    );
  }
}

export default withPageAnalytics(CreateExperiment);
