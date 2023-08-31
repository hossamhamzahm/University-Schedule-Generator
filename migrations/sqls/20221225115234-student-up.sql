-- UP MIGRAITON
CREATE TABLE IF NOT EXISTS student(
    student_username VARCHAR(35),
    hashed_password VARCHAR(200),
    student_faculty VARCHAR(50),

    PRIMARY KEY(student_username),
    FOREIGN KEY (student_username) REFERENCES user(user_username),
    CHECK (student_faculty IN ('EAS', 'Business', 'CS'))
);