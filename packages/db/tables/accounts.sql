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
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (account_ref)
);