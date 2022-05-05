USE idea_camels;

DROP TABLE IF EXISTS campaigns;

CREATE TABLE campaigns
(
  campaign_ref int NOT NULL AUTO_INCREMENT,
  account_ref int NOT NULL,
  experiment_ref int NOT NULL,
  campaign_name VARCHAR(500) DEFAULT '', 
  budget_name VARCHAR(500) DEFAULT '', 
  ad_group_name VARCHAR(500) DEFAULT '', 
  ad_group_ad_name VARCHAR(500) DEFAULT '',
  criterion_0_name VARCHAR(500) DEFAULT '',
  criterion_1_name VARCHAR(500) DEFAULT '',
  criterion_2_name VARCHAR(500) DEFAULT '',
  criterion_3_name VARCHAR(500) DEFAULT '',
  criterion_4_name VARCHAR(500) DEFAULT '',
  criterion_5_name VARCHAR(500) DEFAULT '',
  keyword_0 VARCHAR(500) DEFAULT '',
  keyword_1 VARCHAR(500) DEFAULT '',
  keyword_2 VARCHAR(500) DEFAULT '',
  keyword_3 VARCHAR(500) DEFAULT '',
  keyword_4 VARCHAR(500) DEFAULT '',
  keyword_5 VARCHAR(500) DEFAULT '',
  keyword_6 VARCHAR(500) DEFAULT '',
  headline VARCHAR(500) DEFAULT '',
  headline_2 VARCHAR(500) DEFAULT '',
  created_by int(9),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (campaign_ref)
);