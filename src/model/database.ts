import mysql from "mysql2";
import Config from "../config";


const {db_host, db_name, db_port, db_user, db_password} = Config;


let Pool: mysql.Pool;


if ( process.env.NODE_ENV === "prod") {
	Pool = mysql.createPool({
		multipleStatements: true,
		host: db_host,
		password: db_password,
		user: db_user,
		database: db_name,
		port: db_port,
	});
} 
else {
	Pool = mysql.createPool({
		host: db_host,
		password: db_password,
		user: "test_user",
		database: "company_test",
		port: db_port,
	});
}

export default Pool;