USE idea_camels;

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts
(
  account_ref int NOT NULL AUTO_INCREMENT,
  payment_customer_id VARCHAR(200) DEFAULT '',
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
  `payment_customer_id`,
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
    "cus_LSAZrhSsamBd47",
    'nialloc9@gmail.com',
    'Niall',
    "O' Connor",
    '7d36aecd55e684229ed748be354d3817b4a63e8cc0bbcfae7b138eac62b3bcac',
    '1',
    null,
    null,
    null,
    0
);