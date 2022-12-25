login to Mysql using root user then execute the following


- Run the following commands to create the needed users and databases

```

CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY '@sdfghjkL12345';
CREATE DATABASE schedul_generator;
USE schedul_generator;
GRANT ALL PRIVILEGES ON schedul_generator TO 'admin'@'localhost';


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '@sdfghjkL12345';


```