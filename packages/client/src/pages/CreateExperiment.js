import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../components/Grid";
import { Segment } from "../components/Styled/Segment";
import { Dropdown } from "../components/Styled/Dropdown";
import { ValidationForm, Field } from "../components/Form/Form";
import Default, { 
  theme as defaultTheme,
  content as defaultContent 
} from "../templates/1";
import withPageAnalytics from "../hoc/withPageAnalytics";
import { remCalc } from "../utils/style";
import { toTitleCase } from "../utils/utils";
import { onFetchTemplates, onSetExperiment } from '../store/actions/experiment'
import { connect } from '../store'

const themeMap = {
  1: defaultTheme
}

const contentMap = {
  1: defaultContent
}

class CreateExperiment extends Component {

  get templateOptions() {
    const { templates = [] } = this.props;
    
    return templates.map(({ name, template_ref }) => ({ key: template_ref, text: toTitleCase(name), value: template_ref }))
  }

  get themeOptions() {
    const { templates = [], newExperiment: { templateRef } } = this.props;
   
    return templates.reduce((total, { theme_name, theme_ref, template_ref }) => {
      if(template_ref === templateRef) total.push({ key: theme_ref, value: theme_ref, text: toTitleCase(theme_name) });

      return total;
    }, [])
  }

  componentDidMount() {
    const { onFetchTemplates } = this.props;

    onFetchTemplates();
  }

  handleSelectTemplate = (e, { value }) => {
    const { onSetExperiment } = this.props;

    onSetExperiment({ templateRef: value, themeRef: undefined, content: contentMap[value] });
  };

  handleSelectTheme = (e, { value }) => {
    const { onSetExperiment } = this.props;
    onSetExperiment({ themeRef: value, theme: themeMap[value] });
  };

  renderThemeSelect = () => {
    const { newExperiment: { templateRef, themeRef } } = this.props;
    
    if(!templateRef || this.templateOptions.length === 0) return null;

    const { isFetchTemplatesLoading } = this.props;

    return (
      <Dropdown
        defaultValue={themeRef}
        lazyLoad
        selection
        display="block"
        tabletDisplay="inline-block"
        options={this.themeOptions}
        placeholder="Please select a theme"
        loading={isFetchTemplatesLoading}
        onChange={this.handleSelectTheme}
      />
    )
  }

  renderTemplateSelect = () => {

    const { isFetchTemplatesLoading, newExperiment: { templateRef } } = this.props;

    return (
      <Dropdown
        lazyLoad
        defaultValue={templateRef}
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
    )
  }

  renderMetaData = () => {
    return (
      <ValidationForm>
        <Field />
      </ValidationForm>
    )
  }

  renderTemplate = () => {

    const { newExperiment: { templateRef = 1, content, theme }, onSetExperiment } = this.props;

    if([templateRef, content, theme].some(o => !o)) return null;
    
    const Component = {
      1: Default
    }[templateRef]
    
    return <Segment padded maxHeight={remCalc(700)} overflow="hidden auto"><Component theme={theme} content={content} onSetExperiment={onSetExperiment} /></Segment>
  }

  render() {
    return (
      <Grid padded centered stackable>
        <GridRow columns={1}>
          <GridColumn>
            {this.renderTemplateSelect()}
            {this.renderThemeSelect()}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>

          </GridColumn>
        </GridRow>
        <GridRow>
          {this.renderTemplate()}
        </GridRow>
      </Grid>
    )
  }
}

const mapStateToProps = ({ experiment: { templates, isFetchTemplatesLoading, fetchTemplatesErrorMessage, experiment } }) => ({ templates, isFetchTemplatesLoading, fetchTemplatesErrorMessage, newExperiment: experiment });

export default connect(mapStateToProps, { onFetchTemplates, onSetExperiment })(withPageAnalytics(CreateExperiment));

