USE idea_camels;

DROP TABLE IF EXISTS templates;

CREATE TABLE templates
(
  theme_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  content TEXT,
  theme TEXT,
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (template_ref)
);

INSERT INTO `idea_camels`.`themes`
(
  `theme_ref`,
  `name`,
  `content`,
  `theme`,
  `created_by`,
  `created_at`,
  `last_updated_at`,
  `last_updated_by`,
  `deleted_flag`
)
VALUES
  (
    1,
    `ideacamels`,
    1,
    1,
    1,
    "{}",
    '{}',
    1,
    null,
    null,
    1,
    0
);