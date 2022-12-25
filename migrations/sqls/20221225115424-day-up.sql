-- UP MIGRATION
CREATE TABLE IF NOT EXISTS day(
    day_id INTEGER,
    hour_1_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_2_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_3_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_4_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_5_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_6_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_7_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_8_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_9_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_10_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_11_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),
    hour_12_course_code VARCHAR(12) DEFAULT NULL REFERENCES course(course_code),

    PRIMARY KEY(day_id)
);