USE idea_camels;

DROP TABLE IF EXISTS reports;

CREATE TABLE reports
(
  report_ref int NOT NULL AUTO_INCREMENT,
  experiment_ref int NOT NULL,
  google_ads_campaign_id VARCHAR(100) NOT NULL,
  impressions int DEFAULT 0,
  clicks int DEFAULT 0,
  average_cpm int DEFAULT 0,
  average_cpc int DEFAULT 0,
  cost_micros int DEFAULT 0,
  engagements int DEFAULT 0
  PRIMARY KEY (report_ref)
);

ALTER TABLE reports ADD INDEX (google_ads_campaign_id);

INSERT INTO `idea_camels`.`reports`
(
  `report_ref`,
  `experiment_ref`,
  `google_ads_campaign_id`,
  `impressions`,
  `clicks`,
  `average_cpm`,
  `average_cpc`,
  `cost_micros`,
  `engagements`
)
VALUES
  (
    1,
    73,
    "18786302538",
    1,
    9,
    3,
    4,
    5,
    2
);
