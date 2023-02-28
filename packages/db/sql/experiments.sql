USE idea_camels;

DROP TABLE IF EXISTS experiments;

CREATE TABLE experiments
(
  experiment_ref int NOT NULL AUTO_INCREMENT,
  account_ref int NOT NULL,
  domain_ref int NOT NULL,
  theme_ref int NOT NULL,
  template_ref int NOT NULL,
  end_date bigint NOT NULL,
  budget int NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_by int(9),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (experiment_ref)
);

ALTER TABLE experiments ADD INDEX (account_ref);

ALTER TABLE experiments DROP COLUMN budget;
ALTER TABLE experiments DROP COLUMN end_date;

ALTER TABLE experiments ADD INDEX (domain_ref);
ALTER TABLE experiments ADD INDEX (theme_ref);
ALTER TABLE experiments ADD INDEX (template_ref);