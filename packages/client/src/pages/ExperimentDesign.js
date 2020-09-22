import React from "react";
import Default from "../templates/Default";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Segment } from "../components/Styled/Segment";
import { Dropdown } from "../components/Styled/Dropdown.js";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { ThemeProvider, remCalc } from "../utils/style";
import {
  templateOneDefaultTheme,
  templateOptions,
  activeExperiments,
  themeOptions,
} from "../utils/experimentDesign";

export default withPageAnalytics(() => (
  <ThemeProvider theme={templateOneDefaultTheme}>
    <Grid padded centered stackable>
      <GridRow columns={1}>
        <GridColumn>
          <Dropdown
            label="yrdy"
            lazyLoad
            selection
            display="block"
            tabletDisplay="inline-block"
            options={activeExperiments}
            placeholder="Please select an experiment"
            defaultValue={1}
          />
          <Dropdown
            lazyLoad
            selection
            margin={`${remCalc(15)} 0`}
            tabletMargin={`0 ${remCalc(20)}`}
            display="block"
            tabletDisplay="inline-block"
            options={templateOptions}
            placeholder="Please select a template"
            defaultValue={1}
          />
          <Dropdown
            lazyLoad
            selection
            display="block"
            tabletDisplay="inline-block"
            options={themeOptions}
            placeholder="Please select a theme"
            defaultValue={1}
          />
          <Segment padded maxHeight={remCalc(700)} overflow="hidden auto">
            <Navigation
              isEditable
              editButtonTop="0"
              theme={templateOneDefaultTheme}
            />
            <Default isEditable />
            <Footer isEditable />
          </Segment>
        </GridColumn>
      </GridRow>
    </Grid>
  </ThemeProvider>
));
