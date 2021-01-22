USE idea_camels;

DROP TABLE IF EXISTS templates;

CREATE TABLE templates
(
  template_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  theme_ref int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (template_ref)
);

INSERT INTO `idea_camels`.`templates`
(
  `template_ref`,
  `name`,
  `theme_ref`,
  `created_at`,
  `last_updated_at`,
  `deleted_flag`
)
VALUES
  (
    1,
    "ideacamels",
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    0
);