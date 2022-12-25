ALTER TABLE section 
    ADD instructor_username VARCHAR(30),
    ADD CONSTRAINT FK_SECTION_INSTRUCTOR FOREIGN KEY (instructor_username) REFERENCES instructor(instructor_username)
    ON DELETE SET NULL;