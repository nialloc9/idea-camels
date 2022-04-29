const { mapBuildExperimentToECSConfig } = require("../experiment");
const config = require("../../../utils/config");

describe("experiment utils test suite", () => {
  it("mapBuildExperimentToECSConfig works correctly", () => {

    const domain = "test"
    const experimentRef = 1
    const themeKey = "test/theme.json"
    const contentKey = "test/content.json"
    const templateRef = 2
    const description = "test my idea 0"
    const headline = "test my idea 1"
    const headline2 = "test my idea 2"
    const keywords = ['test', 'tests']
    const caller = "test caller"
    const budget = 10
    expect(
      mapBuildExperimentToECSConfig({
        domain,
        experimentRef,
        themeKey,
        contentKey,
        templateRef,
        description,
    headline,
    headline2,
        keywords,
        caller,
        budget
      })
    ).toEqual({
      cluster: config.aws.clusters.builder.name,
      taskDefinition: config.aws.clusters.builder.taskDefinition,
      environmentVariables: [
        {
          name: "EXPERIMENT_REF",
          value: `${experimentRef}`,
        },
        { name: "TEMPLATE_REF", value: `${templateRef}` },
        { name: "CALLER", value: caller },
        { name: "DOMAIN", value: domain },
        { name: "THEME_KEY", value: themeKey },
        { name: "CONTENT_KEY", value: contentKey },
        
      { name: "DESCRIPTION", value: description },
      { name: "HEADLINE", value: headline },
      { name: "HEADLINE_2", value: headline2 },
      { name: 'KEYWORD_0', value: keywords[0] },
      { name: 'KEYWORD_1', value: keywords[1] },
      { name: 'BUDGET', value: `${budget}` },
      ],
    });
  });
});
