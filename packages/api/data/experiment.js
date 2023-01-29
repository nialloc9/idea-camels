const { query } = require("../utils/database");
const { handleSuccess } = require("../utils/utils");
const { mapper } = require("./utils/experiment");
const { now } = require("../utils/date");
const { addSelectQueryColumns } = require("./utils/utils");

const onGet = ({ caller, experimentRef }) =>
  new Promise(async (resolve, reject) => {
    try {
      let getQuery = `SELECT * FROM experiments`;

      switch (true) {
        case experimentRef:
          getQuery = `${getQuery} WHERE experiment_ref=${experimentRef} AND deleted_flag=0`;
          break;
      }

      const results = await query(
        getQuery,
        undefined,
        caller,
        "GET_EXPERIMENTS"
      );

      resolve(
        handleSuccess(`DATA - GET_EXPERIMENTSF - FROM ${caller}`, {
          experiments: results,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * gets experiments by account ref
 */
const onGetWithThemeAndCampaignByAccountRef = ({
  data: { accountRef, experimentRef },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const values = [
        "c.campaign_name",
        "c.budget_name",
        "c.ad_group_name",
        "c.ad_group_ad_name",
        "c.criterion_0_name",
        "c.criterion_1_name",
        "c.criterion_2_name",
        "c.criterion_3_name",
        "c.criterion_4_name",
        "c.criterion_5_name",
        "c.keyword_0",
        "c.keyword_1",
        "c.keyword_2",
        "c.keyword_3",
        "c.keyword_4",
        "c.keyword_5",
        "c.keyword_6",
        "c.headline",
        "c.headline_2",
        "c.end_date",
        "e.experiment_ref",
        "e.theme_ref",
        "e.template_ref",
        "e.domain_ref",
        "e.status",
        "e.created_at",
        "e.last_updated_at",
        "e.deleted_flag",
        "t.content",
        "t.theme",
        "d.name",
      ];

      const getQuery = `SELECT ${addSelectQueryColumns(
        values
      )} FROM experiments as e LEFT JOIN themes as t ON e.theme_ref = t.theme_ref LEFT JOIN domains as d ON e.domain_ref = d.domain_ref LEFT JOIN campaigns as c on e.experiment_ref = c.experiment_ref WHERE e.account_ref=${accountRef}${
        experimentRef ? ` AND e.experiment_ref='${experimentRef}'` : ""
      } AND e.deleted_flag != 1`;

      const results = await query(
        getQuery,
        undefined,
        caller,
        "GET_EXPERIMENTS_WITH_THEME_AND_CAMPAIGN_BY_ACCOUNT_REF"
      );

      resolve(
        handleSuccess(
          `DATA - GET_EXPERIMENTS_WITH_THEME_AND_CAMPAIGN_BY_ACCOUNT_REF - FROM ${caller}`,
          { experiments: results }
        )
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * creates a new domain
 */
const onCreate = ({ data, caller }) =>
  new Promise(async (resolve, reject) => {
    try {
      const createQuery = "INSERT INTO experiments SET ?";

      const mappedData = mapper(data);

      const results = await query(
        createQuery,
        mappedData,
        caller,
        "CREATE_EXPERIMENT"
      );
      const timestamp = now();

      resolve(
        handleSuccess(`DATA - CREATE_EXPERIMENT - FROM ${caller}`, {
          ...mappedData,
          created_at: timestamp,
          last_updated_at: timestamp,
          experiment_ref: results.insertId,
        })
      );
    } catch (error) {
      reject(error);
    }
  });

/**
 * updates an experiment
 */
const onUpdate = ({
  data: { accountRef, lastUpdatedBy, data: updateData },
  caller,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateQuery = `UPDATE experiments SET ? WHERE account_ref='${accountRef}'`;

      const data = {
        last_updated_by: lastUpdatedBy,
        last_updated_at: null,
        ...mapper(updateData),
      };

      await query(updateQuery, data, caller, "UPDATE_EXPERIMENT");

      resolve(
        handleSuccess(`DATA - UPDATE_EXPERIMENT - FROM ${caller}`, {
          ...data,
          account_ref: accountRef,
          last_updated_at: now(),
        })
      );
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  onGet,
  onGetWithThemeAndCampaignByAccountRef,
  onCreate,
  onUpdate,
};
