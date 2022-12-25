-- UP MIGRATION
CREATE TABLE IF NOT EXISTS course (
    course_code VARCHAR(12),
    course_name VARCHAR(50),

    PRIMARY KEY(course_code)
);
