USE idea_camels;

DROP TABLE IF EXISTS leads;

CREATE TABLE leads
(
  lead_ref int NOT NULL AUTO_INCREMENT,
  experiment_ref int NOT NULL,
  email VARCHAR(200) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (lead_ref)
);