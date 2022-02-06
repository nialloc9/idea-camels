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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  last_logged_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  `last_logged_in`,
  `deleted_flag`
)
VALUES
  (
    1,
    'nialloc9@gmail.com',
    'Niall',
    "O' Connor",
    '68ec070dd9e988dfc12c55e5dfa9612e5645e47a9f908be62e8d56f26c8a109b',
    '1',
    null,
    null,
    null,
    0
);