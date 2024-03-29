-- UP MMIGRATION
CREATE TABLE IF NOT EXISTS schedule(
    student_username VARCHAR(30),
    is_stared BOOLEAN,
    is_registered BOOLEAN,

    schedule_id INTEGER,
    
    sunday_id INTEGER,
    monday_id INTEGER,
    tuesday_id INTEGER,
    wednesday_id INTEGER,
    thursday_id INTEGER,
    
    PRIMARY KEY(schedule_id),
    FOREIGN KEY(student_username) REFERENCES student(student_username),
    FOREIGN KEY(sunday_id) REFERENCES day(day_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(monday_id) REFERENCES day(day_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(tuesday_id) REFERENCES day(day_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(wednesday_id) REFERENCES day(day_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(thursday_id) REFERENCES day(day_id) ON DELETE CASCADE ON UPDATE CASCADE
);