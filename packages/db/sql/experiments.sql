USE idea_camels;

DROP TABLE IF EXISTS experiments;

CREATE TABLE experiments
(
  experiment_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  account_ref int NOT NULL,
  domain_ref int NOT NULL,
  theme_ref int NOT NULL,
  template_ref int NOT NULL,
  expiry TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by int(9),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (experiment_ref)
);

ALTER TABLE experiments ADD INDEX (account_ref);

INSERT INTO `idea_camels`.`experiments`
(
  `experiment_ref`,
  `name`,
  `account_ref`,
  `domain_ref`,
  `theme_ref`,
  `template_ref`,
  `expiry`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`
)
VALUES
  (
    1,
    'Test',
    1,
    1,
    1,
    1,
    CURRENT_TIMESTAMP,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1,
    0
);
