-- UP MIGRATION
CREATE TABLE IF NOT EXISTS section(
    course_code VARCHAR(12),
    section_name VARCHAR(4),
    section_type VARCHAR(8),
    section_day VARCHAR(8) NOT NULL,
    section_from TIME NOT NULL,
    section_to TIME NOT NULL,
    -- instructor_username VARCHAR(30),

    FOREIGN KEY(course_code) REFERENCES course(course_code) ON DELETE CASCADE,
    PRIMARY KEY(course_code, section_name, section_type),
    CHECK (section_day IN ('Saturday', 'Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thursday'))
);