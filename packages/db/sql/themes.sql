USE idea_camels;

DROP TABLE IF EXISTS themes;

CREATE TABLE themes
(
  theme_ref int NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT '',
  content VARCHAR(50) DEFAULT '',
  theme VARCHAR(50) DEFAULT '',
  created_by int(9),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_by int(9),
  deleted_flag int(1) DEFAULT 0,
  PRIMARY KEY (theme_ref)
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
    "ideacamels",
    'themes/1s7rms1906.json',
    'contents/1s7rms1906.json',
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    1,
    0
);