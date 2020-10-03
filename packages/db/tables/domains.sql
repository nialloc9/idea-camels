USE idea_camels;

DROP TABLE IF EXISTS domains;

CREATE TABLE domains
(
  domain_ref int NOT NULL AUTO_INCREMENT,
  account_ref int NOT NULL,
  domain VARCHAR(100) DEFAULT '',
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (domain_ref)
);