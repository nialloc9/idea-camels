import React, { Component } from "react";
import { Grid, GridRow, GridColumn } from "../Grid";
import { Segment } from "../Styled/Segment";
import { Form } from "../Form/Form";
import { Dropdown } from "../Form/Dropdown";
import { toTitleCase } from "../../utils/utils";
import { onPrepareExperiment } from "../../store/actions/experiment";
import { connect } from "../../store";
import templates, { findTemplate } from "../../templates";

class EditForm extends Component {
  get templateOptions() {
    return templates.map(({ config: { name, ref } }) => ({
      key: ref,
      text: toTitleCase(`${name} Template`),
      value: ref,
    }));
  }

  get themeOptions() {
    const {
      newExperiment: { templateRef },
    } = this.props;

    const template = findTemplate(templateRef);

    if (!template) return [];

    const {
      config: { themes },
    } = template;

    return themes.map(({ name, ref }) => ({
      key: ref,
      value: ref,
      text: toTitleCase(`${name} Theme`),
    }));
  }

  render() {
    const { isFetchTemplatesLoading, newExperiment, onSubmit } = this.props;

    const { templateRef, themeRef } = newExperiment;

    return (
      <Segment padded>
        <Form initialValues={newExperiment}>
          <Grid container centered stackable>
            <GridRow centered columns={2}>
              <GridColumn>
                <Dropdown
                  labelText="Template"
                  name="templateRef"
                  lazyLoad
                  labeled
                  defaultValue={templateRef}
                  selection
                  search
                  display="block"
                  action="edit-experiment-form-click"
                  label="template"
                  tabletDisplay="inline-block"
                  options={this.templateOptions}
                  placeholder="Please select a template"
                  loading={isFetchTemplatesLoading}
                  onChange={(value) =>
                    onSubmit({ templateRef: value, themeRef: 1 })
                  }
                />
              </GridColumn>
              <GridColumn>
                <Dropdown
                  labelText="Theme"
                  name="themeRef"
                  value={themeRef}
                  lazyLoad
                  selection
                  display="block"
                  action="edit-experiment-form-click"
                  label="theme"
                  tabletDisplay="inline-block"
                  options={this.themeOptions}
                  disabled={this.themeOptions.length === 0}
                  placeholder="Please select a theme"
                  loading={isFetchTemplatesLoading}
                  onChange={(value) =>
                    onSubmit({ templateRef, themeRef: value })
                  }
                />
              </GridColumn>
            </GridRow>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default connect(
  ({ experiment: { newExperiment } }) => ({
    newExperiment,
    initialValues: newExperiment,
  }),
  { onSubmit: onPrepareExperiment }
)(EditForm);
