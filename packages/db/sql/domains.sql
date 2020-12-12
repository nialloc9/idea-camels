USE idea_camels;

DROP TABLE IF EXISTS domains;

CREATE TABLE domains
(
  domain_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  account_ref int NOT NULL,
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (domain_ref)
);

ALTER TABLE domains ADD INDEX (account_ref);

INSERT INTO `idea_camels`.`domains`
(
  `domain_ref`,
  `name`,
  `account_ref`,
  `domain_name`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`
)
VALUES
  (
    1,
    'ideacamels.com',
    1,
    1,
    null,
    null,
    1,
    0
);