-- UP MIGRATION
CREATE TABLE IF NOT EXISTS day(
    day_id INTEGER AUTO_INCREMENT,
    hour_1_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_2_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_3_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_4_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_5_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_6_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_7_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_8_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_9_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_10_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_11_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),
    hour_12_section_id VARCHAR(24) DEFAULT NULL REFERENCES section(section_id),

    PRIMARY KEY(day_id)
);