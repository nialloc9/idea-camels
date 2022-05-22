  const { handleSuccess } = require("../utils/utils");
  const { runTask } = require("../utils/aws");
  const {
    mapBuildExperimentToECSConfig,
  } = require("./utils/experiment");
  
  /**
   * @description Manually reates an experiment 
   * @param {*} param0
   * @returns
   */
  const onManuallyRunExperiment = ({
    data: {
        domain,
        experimentRef,
        themeKey,
        contentKey,
        templateRef,
        description,
        headline,
        headline2,
        keywords,
        budget,
        shouldConfigureInfra="y",
        shouldConfigureClient="y",
        shouldConfigureCampaign="y",
        shouldRunPostBuild="y",
    },
    caller,
  }) =>
    new Promise(async (resolve, reject) => {
      try {

        const defaulTaskConfig = mapBuildExperimentToECSConfig({
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
          });

        const { error: taskError } = await runTask(
          {
              ...defaulTaskConfig,
              environmentVariables: [
                ...defaulTaskConfig.environmentVariables, 
                { "name": "SHOULD_CONFIGURE_INFRASTRUCTURE", value: shouldConfigureInfra },
                { "name": "SHOULD_CONFIGURE_CLIENT", value: shouldConfigureClient },
                { "name": "SHOULD_CONFIGURE_CAMPAIGN", value: shouldConfigureCampaign },
                { "name": "SHOULD_RUN_POST_BUILD", value: shouldRunPostBuild },
            ]
          }
        );
  
        if (taskError) {
          throw new Error(taskError);
        }
  
        resolve(
          handleSuccess("SERVICE ADMIN - EXPERIMENT MANUALLY STARTED", {
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
        );
      } catch (error) {
        reject(error);
      }
    });
  
  module.exports = {
    onManuallyRunExperiment
  };
  