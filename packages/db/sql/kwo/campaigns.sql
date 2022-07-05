/*
-- Query: SELECT * FROM campaigns
LIMIT 0, 1000

-- Date: 2022-07-03 12:14
*/

USE kwo;

DROP TABLE IF EXISTS campaigns;

CREATE TABLE campaigns
(
  campaign_ref int NOT NULL AUTO_INCREMENT,
  account_ref int NOT NULL,
  experiment_ref int NOT NULL,
  campaign_name VARCHAR(100) DEFAULT '', 
  customer_id VARCHAR(100) DEFAULT '', 
  client_id VARCHAR(100) DEFAULT '', 
  refresh_token VARCHAR(100) DEFAULT '',
  developer_token VARCHAR(100) DEFAULT '',
  client_secret VARCHAR(100) DEFAULT '',
  created_by int(9),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (campaign_ref)
);