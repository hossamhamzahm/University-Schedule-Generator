import Pool from "./database";
import { UserStore } from './user'

interface Instructor {
	instructor_username: string;
	f_name?: string;
	m_name?: string;
	l_name?: string;
    instructor_faculty?: string;
}


class InstructorStore {
	async index(pageNo: number = 1, limit: number = 20): Promise<any> {
		const offset = (pageNo - 1) * limit;

		return new Promise((resolve, reject) => {
			const query = `SELECT * 
            FROM instructor
            LEFT JOIN user
            ON instructor_username = user_username
			LIMIT ? OFFSET ?;`;

			Pool.query(query, [limit, offset], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async show(instructor_username: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `SELECT * 
            FROM instructor
            LEFT JOIN user
            ON ? = user_username
			WHERE instructor_username = ?;`;

			Pool.query(query, [instructor_username, instructor_username], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async create(instructor: Instructor): Promise<any> {
		const userStore = new UserStore();
		const user = await userStore.create({
			user_username: instructor.instructor_username,
			f_name: instructor.f_name as string,
			m_name: instructor.m_name as string,
			l_name: instructor.l_name as string,
		});

		return new Promise((resolve, reject) => {
			Pool.query(
				"INSERT INTO instructor VALUES (?, ?);",
				[instructor.instructor_username, instructor.instructor_faculty],
				(err, results, fields) => {
					if (err) reject(err);

					return resolve(results); // results contains rows returned by server
					// console.log(fields);
				}
			);
		});
	}

	async update(instructor_username: string, instructor: Instructor): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `UPDATE user
            SET f_name = ?, m_name = ?, l_name = ?
			WHERE user_username = ?;
			
			UPDATE instructor
            SET instructor_faculty = ?
			WHERE instructor_username = ?;`;

			const params = [
				instructor.f_name,
				instructor.m_name,
				instructor.l_name,
				instructor_username,
				instructor.instructor_faculty,
				instructor_username,
			];

			Pool.query(query, params, (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async remove(instructor_username: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
			DELETE FROM instructor
			WHERE instructor_username = ?;
			
			DELETE FROM user
			WHERE user_username = ?;`;


			Pool.query(query, [instructor_username, instructor_username], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}
}


export {
    Instructor,
    InstructorStore,
}