-- UP MIGRAITON
CREATE TABLE IF NOT EXISTS student(
    student_username VARCHAR(30),
    hashed_password VARCHAR(120),
    student_major VARCHAR(50),

    PRIMARY KEY(student_username),
    FOREIGN KEY (student_username) REFERENCES user(user_username),
    CHECK (student_major IN ('Engineering', 'Business', 'Computer Science'))
);