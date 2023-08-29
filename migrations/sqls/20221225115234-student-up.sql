-- UP MIGRAITON
CREATE TABLE IF NOT EXISTS student(
    student_username VARCHAR(35),
    hashed_password VARCHAR(200),
    student_major VARCHAR(50),

    PRIMARY KEY(student_username),
    FOREIGN KEY (student_username) REFERENCES user(user_username),
    CHECK (faculty IN ('Engineering', 'Business', 'Computer Science'))
);