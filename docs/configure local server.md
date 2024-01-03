## Project Setup


### 1-login to Mysql using root user then execute the following comments to create the database


#### 1.1-Run the following commands to create the needed user and database

```

CREATE USER 'replace with user name'@'localhost' IDENTIFIED WITH mysql_native_password BY 'replace with password';
CREATE DATABASE schedule_generator;
USE schedule_generator;
GRANT ALL PRIVILEGES ON schedule_generator.* TO 'replace with user name'@'localhost';

```


#### 2-Create a hidden file (starting with a dot) in root directrory called `.env` and put these environment variables in it
```
PORT=3000
DB_USER=replace_with_user_created_above
DB_PASSWORD=replace_with_password_created_above
DB_HOST=localhost
DB_NAME=schedule_generator
DB_PORT=3306
ENV=dev
``` 

> the `.env` file contains the necessary data to connect to mysql and without it, no interaction can be done with the database.



### 3-Before Running The App:
    - 3.1-install all dependencies by running `npm install` command.
    - 3.2-Execute database migrations and seeds by running `npm run migrate` command.


#### 4-Finally, to start the server in watch mode run `npm run watch` command.

> visit `http://localhost:3000/api-docs` to view endpoints documentation




### test section


### contributing
