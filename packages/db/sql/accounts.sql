USE idea_camels;

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts
(
  account_ref int NOT NULL AUTO_INCREMENT,
  email VARCHAR(200) DEFAULT '',
  first_name VARCHAR(200) DEFAULT '',
  last_name VARCHAR(200) DEFAULT '',
  password VARCHAR(200) DEFAULT '',
  phone VARCHAR(200) DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (account_ref)
);

ALTER TABLE accounts ADD INDEX (email);

INSERT INTO `idea_camels`.`accounts`
(
  `account_ref`,
  `email`,
  `first_name`,
  `last_name`,
  `password`,
  `phone`,
  `created_at`,
  `last_updated_at`,
  `deleted_flag`
)
VALUES
  (
    1,
    'ideacamels@gmail.com',
    'Niall',
    "O' Connor",
    '$2a$10$yZSzm8lYu3gtVQ7XRVHh2.vFVw1B/LIZZ/A6WMX0wrGGNBvyDsfLa',
    '1',
    null,
    null,
    1,
    0
);