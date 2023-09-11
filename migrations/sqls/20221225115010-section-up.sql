-- UP MIGRATION
CREATE TABLE IF NOT EXISTS section(
    section_id INTEGER AUTO_INCREMENT,
    course_code VARCHAR(12),
    section_name VARCHAR(4),
    section_type VARCHAR(8),
    section_day VARCHAR(10) NOT NULL,
    section_from TIME NOT NULL,
    section_to TIME NOT NULL,

    PRIMARY KEY(section_id),
    FOREIGN KEY(course_code) REFERENCES course(course_code) ON DELETE CASCADE,
    UNIQUE (course_code, section_name, section_type),
    CHECK (section_day IN ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
    CHECK (section_type IN ('Lecture', 'Lab', 'Tutorial'))
);