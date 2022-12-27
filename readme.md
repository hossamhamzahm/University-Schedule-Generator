### 1-login to Mysql using root user then execute the following comments to create the database


#### 1.1-Run the following commands to create the needed user and database

```

CREATE USER 'replace with user name'@'localhost' IDENTIFIED WITH mysql_native_password BY 'replace with password';
CREATE DATABASE schedul_generator;
USE schedul_generator;
GRANT ALL PRIVILEGES ON schedul_generator TO 'admin'@'localhost';

```


#### 2-Create a hidden file (starting with a dot) in root directrory called `.env` and put this environment variables in it
```
PORT=3000
DB_USER=replace_with_user_created_above
DB_PASSWORD=replace_with_password_created_above
DB_HOST=localhost
DB_NAME=schedule_generator
DB_PORT=3306
``` 

> the `.env` file contains the necessary data to connect to mysql and without it, no interaction can be done with the database.



#### 3-before running the app install all dependencies by running `npm install` command.

#### 4-before running the app setup database migrations by running `npm run migrate` command.


#### 5-finally, to start the server in watch mode run `npm run watch` command.

> visit `http://localhost:3000/api-docs` to view endpoints documentation