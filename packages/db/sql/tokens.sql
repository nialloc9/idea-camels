USE idea_camels;

DROP TABLE IF EXISTS tokens;

CREATE TABLE tokens (
    token_ref int NOT NULL AUTO_INCREMENT,
    token VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL,
    type VARCHAR(100) NOT NULL,
    expires TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by int(9),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by int(9),
    deleted_flag int(1) DEFAULT 0,
    PRIMARY KEY(token_ref)
);

ALTER TABLE tokens ADD INDEX (token);
ALTER TABLE tokens ADD INDEX (email);
ALTER TABLE tokens ADD INDEX (expires);

INSERT INTO `idea_camels`.`tokens`
(	`token_ref`,
    `token`,
    `email`,
    `type`,
    `expires`,
    `created_by`,
    `created_at`,
    `last_updated_at`,
    `last_updated_by`,
    `deleted_flag`)
VALUES
(
    1,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImVtYWlsIn0.O4RfFPPdKL0VQCRVezc8DQVb3Kh_LRsTGOFbBxxELkY",
    "nialloc9@gmail.com",
    "RESET_PASSWORD_EMAIL",
    null,
    2,
    null,
    null,
    2,
    null
);
