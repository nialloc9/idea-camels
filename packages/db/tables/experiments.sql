USE idea_camels;

DROP TABLE IF EXISTS experiments;

CREATE TABLE experiments
(
  experiment_ref int NOT NULL AUTO_INCREMENT,
  account_ref int NOT NULL,
  domain_ref int NOT NULL,
  template_ref int NOT NULL,
  content TEXT,
  theme TEXT,
  expiry TIMESTAMP NOT NULL,
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (experiment_ref)
);