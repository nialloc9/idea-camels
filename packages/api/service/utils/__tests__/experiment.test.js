const { mapBuildExperimentToECSConfig } = require("../experiment");
const config = require("../../../utils/config");

describe("experiment utils test suite", () => {
  it("mapBuildExperimentToECSConfig works correctly", () => {
    expect(
      mapBuildExperimentToECSConfig({
        domain: "test",
        experimentRef: 1,
        themeKey: "test/theme.json",
        contentKey: "test/content.json",
        templateRef: 2,
        caller: "test caller",
      })
    ).toEqual({
      cluster: config.aws.clusters.builder.name,
      taskDefinition: config.aws.clusters.builder.taskDefinition,
      environmentVariables: [
        {
          name: "EXPERIMENT_REF",
          value: "1",
        },
        { name: "TEMPLATE_REF", value: "2" },
        { name: "CALLER", value: "test caller" },
        { name: "DOMAIN", value: "test" },
        { name: "THEME_KEY", value: "test/theme.json" },
        { name: "CONTENT_KEY", value: "test/content.json" },
      ],
    });
  });
});
