-- UP MIGRATION
CREATE TABLE IF NOT EXISTS section(
    course_code VARCHAR(12),
    section_name VARCHAR(4),
    section_type VARCHAR(8),
    section_day VARCHAR(10) NOT NULL,
    section_from TIME NOT NULL,
    section_to TIME NOT NULL,

    FOREIGN KEY(course_code) REFERENCES course(course_code) ON DELETE CASCADE,
    PRIMARY KEY(course_code, section_name, section_type),
    CHECK (section_day IN ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday')),
    CHECK (section_type IN ('Lecture', 'Lab', 'Tutorial'))
);