/*
-- Query: SELECT * FROM campaigns
LIMIT 0, 1000

-- Date: 2022-07-03 12:14
*/

USE idea_camels;

DROP TABLE IF EXISTS campaigns;

CREATE TABLE campaigns
(
  campaign_ref int NOT NULL AUTO_INCREMENT,
  account_ref int NOT NULL,
  experiment_ref int NOT NULL,
  campaign_name VARCHAR(100) DEFAULT '', 
  budget_name VARCHAR(100) DEFAULT '', 
  ad_group_name VARCHAR(100) DEFAULT '', 
  ad_group_ad_name VARCHAR(100) DEFAULT '',
  criterion_0_name VARCHAR(100) DEFAULT '',
  criterion_1_name VARCHAR(100) DEFAULT '',
  criterion_2_name VARCHAR(100) DEFAULT '',
  criterion_3_name VARCHAR(100) DEFAULT '',
  criterion_4_name VARCHAR(100) DEFAULT '',
  criterion_5_name VARCHAR(100) DEFAULT '',
  criterion_6_name VARCHAR(100) DEFAULT '',
  criterion_7_name VARCHAR(100) DEFAULT '',
  criterion_8_name VARCHAR(100) DEFAULT '',
  criterion_9_name VARCHAR(100) DEFAULT '',
  criterion_10_name VARCHAR(100) DEFAULT '',
  criterion_11_name VARCHAR(100) DEFAULT '',
  criterion_12_name VARCHAR(100) DEFAULT '',
  criterion_13_name VARCHAR(100) DEFAULT '',
  criterion_14_name VARCHAR(100) DEFAULT '',
  criterion_15_name VARCHAR(100) DEFAULT '',
  criterion_16_name VARCHAR(100) DEFAULT '',
  criterion_17_name VARCHAR(100) DEFAULT '',
  criterion_18_name VARCHAR(100) DEFAULT '',
  criterion_19_name VARCHAR(100) DEFAULT '',
  keyword_0 VARCHAR(100) DEFAULT '',
  keyword_1 VARCHAR(100) DEFAULT '',
  keyword_2 VARCHAR(100) DEFAULT '',
  keyword_3 VARCHAR(100) DEFAULT '',
  keyword_4 VARCHAR(100) DEFAULT '',
  keyword_5 VARCHAR(100) DEFAULT '',
  keyword_6 VARCHAR(100) DEFAULT '',
  keyword_7 VARCHAR(100) DEFAULT '',
  keyword_8 VARCHAR(100) DEFAULT '',
  keyword_9 VARCHAR(100) DEFAULT '',
  keyword_10 VARCHAR(100) DEFAULT '',
  keyword_11 VARCHAR(100) DEFAULT '',
  keyword_12 VARCHAR(100) DEFAULT '',
  keyword_13 VARCHAR(100) DEFAULT '',
  keyword_14 VARCHAR(100) DEFAULT '',
  keyword_15 VARCHAR(100) DEFAULT '',
  keyword_16 VARCHAR(100) DEFAULT '',
  keyword_17 VARCHAR(100) DEFAULT '',
  keyword_18 VARCHAR(100) DEFAULT '',
  keyword_19 VARCHAR(100) DEFAULT '',
  headline VARCHAR(100) DEFAULT '',
  headline_2 VARCHAR(100) DEFAULT '',
  headline_3 VARCHAR(100) DEFAULT '',
  description VARCHAR(100) DEFAULT '',
  description_2 VARCHAR(100) DEFAULT '',
  created_by int(9),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (campaign_ref)
);

ALTER TABLE campaigns
ADD keyword_optimiser int DEFAULT 1 AFTER ad_group_ad_name;

INSERT INTO `campaigns` (`campaign_ref`,`account_ref`,`experiment_ref`,`campaign_name`,`budget_name`,`ad_group_name`,`ad_group_ad_name`,`criterion_0_name`,`criterion_1_name`,`criterion_2_name`,`criterion_3_name`,`criterion_4_name`,`criterion_5_name`,`keyword_0`,`keyword_1`,`keyword_2`,`keyword_3`,`keyword_4`,`keyword_5`,`keyword_6`,`headline`,`headline_2`,`created_by`,`created_at`,`last_updated_at`,`last_updated_by`,`deleted_flag`) VALUES (47,1,61,'customers/5213472317/campaigns/17431991901','customers/5213472317/campaignBudgets/10935933037','customers/5213472317/adGroups/136311796505','customers/5213472317/adGroupAds/136311796505~598877229272','customers/5213472317/adGroupCriteria/136311796505~10000010','customers/5213472317/adGroupCriteria/136311796505~10000010','', '', '','','','test','test','','','','','','test','test my idea',NULL,'2022-05-18 16:40:48','2022-05-18 16:40:48',NULL,0);
INSERT INTO `campaigns` (`campaign_ref`,`account_ref`,`experiment_ref`,`campaign_name`,`budget_name`,`ad_group_name`,`ad_group_ad_name`,`criterion_0_name`,`criterion_1_name`,`criterion_2_name`,`criterion_3_name`,`criterion_4_name`,`criterion_5_name`,`keyword_0`,`keyword_1`,`keyword_2`,`keyword_3`,`keyword_4`,`keyword_5`,`keyword_6`,`headline`,`headline_2`,`created_by`,`created_at`,`last_updated_at`,`last_updated_by`,`deleted_flag`) VALUES (48,1,62,'customers/5213472317/campaigns/17304726638','customers/5213472317/campaignBudgets/10927204004','customers/5213472317/adGroups/133757099741','customers/5213472317/adGroupAds/133757099741~598886712707','customers/5213472317/adGroupCriteria/133757099741~10000010','customers/5213472317/adGroupCriteria/133757099741~10000010','','', '', '','','test','test','','','','','','test','test my idea',NULL,'2022-05-18 17:59:51','2022-05-18 17:59:51',NULL,0);
INSERT INTO `campaigns` (`campaign_ref`,`account_ref`,`experiment_ref`,`campaign_name`,`budget_name`,`ad_group_name`,`ad_group_ad_name`,`criterion_0_name`,`criterion_1_name`,`criterion_2_name`,`criterion_3_name`,`criterion_4_name`,`criterion_5_name`,`keyword_0`,`keyword_1`,`keyword_2`,`keyword_3`,`keyword_4`,`keyword_5`,`keyword_6`,`headline`,`headline_2`,`created_by`,`created_at`,`last_updated_at`,`last_updated_by`,`deleted_flag`) VALUES (49,5,66,'customers/5213472317/campaigns/17317993818','customers/5213472317/campaignBudgets/10954547427','customers/5213472317/adGroups/137802069995','customers/5213472317/adGroupAds/137802069995~599868710873','customers/5213472317/adGroupCriteria/137802069995~1659013350469','customers/5213472317/adGroupCriteria/137802069995~297149911639','', '','','','','Connect with your frends','dont miss a beat','','','','','','Connect with your frends','Simple, quick, and easy',NULL,'2022-05-23 22:09:32','2022-05-23 22:09:32',NULL,0);
