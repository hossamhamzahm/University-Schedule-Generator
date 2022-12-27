import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, ENV } = process.env;


let Pool: mysql.Pool;


if (ENV === "dev") {
	Pool = mysql.createPool({
		multipleStatements: true,
		host: DB_HOST,
		password: DB_PASSWORD,
		user: DB_USER,
		database: DB_NAME,
		port: DB_PORT as unknown as number,
	});
} 
else {
	Pool = mysql.createPool({
		host: DB_HOST,
		password: DB_PASSWORD,
		user: "test_user",
		database: "company_test",
		port: DB_PORT as unknown as number,
	});
}

export default Pool;