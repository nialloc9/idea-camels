import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Segment } from "../components/Styled/Segment";
import { Dropdown } from "../components/Styled/Dropdown";
import Default from "../templates/1";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import {
  theme as defaultTheme,
  content as defaultContent
} from "../templates/1";
import { onFetchTemplates } from '../store/actions/experiment'
import { connect } from '../store'

class CreateExperiment extends Component {

  state = {
    selectedTemplate: undefined
  }

  get templateOptions() {
    const { templates = [] } = this.props;
    
    return templates.map(({ name, template_ref }) => ({ key: template_ref, text: name, value: template_ref }))
  }

  get themeOptions() {
    const { templates = [] } = this.props;
    
    return templates.map(({ theme_name, theme_ref }) => ({ key: theme_ref, text: theme_name, value: theme_ref }))
  }

  componentDidMount() {
    const { onFetchTemplates } = this.props;

    onFetchTemplates();
  }

  renderThemeSelect = () => {
    const { selectedTemplate } = this.state;
    
    if(!selectedTemplate || this.templateOptions.length === 0) return null;

    const { isFetchTemplatesLoading } = this.props;

    return (
      <Dropdown
        lazyLoad
        selection
        display="block"
        tabletDisplay="inline-block"
        options={this.themeOptions}
        placeholder="Please select a theme"
        loading={isFetchTemplatesLoading}
      />
    )
  }

  handleSelectTemplate = (e, { value }) => this.setState({ selectedTemplate: value });

  render() {
    const { isFetchTemplatesLoading } = this.props;
    
    return (
      <Grid padded centered stackable>
        <GridRow columns={1}>
          <GridColumn>
            <Dropdown
              lazyLoad
              selection
              margin={`${remCalc(15)} 0`}
              tabletMargin={`0 ${remCalc(20)}`}
              display="block"
              tabletDisplay="inline-block"
              options={this.templateOptions}
              placeholder="Please select a template"
              loading={isFetchTemplatesLoading}
              onChange={this.handleSelectTemplate}
            />
            {this.renderThemeSelect()}
            <Segment padded maxHeight={remCalc(700)} overflow="hidden auto">
              <Default theme={defaultTheme} content={defaultContent} />
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }
}

const mapStateToProps = ({ experiment: { templates, isFetchTemplatesLoading, fetchTemplatesErrorMessage } }) => ({ templates, isFetchTemplatesLoading, fetchTemplatesErrorMessage });

export default connect(mapStateToProps, { onFetchTemplates })(withPageAnalytics(CreateExperiment));

