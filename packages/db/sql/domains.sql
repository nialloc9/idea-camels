USE idea_camels;

DROP TABLE IF EXISTS domains;

CREATE TABLE domains
(
  domain_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  account_ref int NOT NULL,
  expiry TIMESTAMP NOT NULL,
  created_by int(9) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    'ideacamels.com',
    1,
    null,
    1,
    null,
    null,
    1,
    0
);

INSERT INTO `idea_camels`.`domains`
(
  `domain_ref`,
  `name`,
  `account_ref`,
  `expiry`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`
)
VALUES
  (
    2,
    'ideacamels.link',
    1,
    null,
    1,
    null,
    null,
    1,
    0
);

UPDATE domains SET expiry = (CURDATE() + INTERVAL 1 YEAR) WHERE domain_ref = 1;
UPDATE domains SET expiry = (CURDATE() + INTERVAL 1 YEAR) WHERE domain_ref = 2;