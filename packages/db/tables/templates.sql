USE idea_camels;

DROP TABLE IF EXISTS templates;

CREATE TABLE templates
(
  template_ref int NOT NULL AUTO_INCREMENT,
  content TEXT,
  theme TEXT,
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (template_ref)
);