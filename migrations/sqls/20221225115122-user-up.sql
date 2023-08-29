-- UP MIGRAITON
CREATE TABLE IF NOT EXISTS user(
    user_username VARCHAR(35),
    f_name VARCHAR(20),
    m_name VARCHAR(20),
    l_name VARCHAR(20),

    PRIMARY KEY(user_username)
);