import Pool from "./database";
import { UserStore } from './user'

interface Student {
	student_username: string;
	f_name?: string;
	m_name?: string;
	l_name?: string;
	student_major: string;
	student_password?: string;
	hashed_password?: string;
}


class StudentStore {
	// async index(pageNo: number = 1, limit: number = 20): Promise<any> {
	// 	const offset = (pageNo - 1) * limit;

	// 	return new Promise((resolve, reject) => {
	// 		const query = `SELECT * 
    //         FROM instructor
    //         LEFT JOIN user
    //         ON instructor_username = user_username
	// 		LIMIT ? OFFSET ?;`;

	// 		Pool.query(query, [limit, offset], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results); // results contains rows returned by server
	// 		});
	// 	});
	// }

	async show(student_username: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `SELECT * 
            FROM student
            LEFT JOIN user
            ON ? = user_username
			WHERE student_username = ?;`;

			Pool.query(query, [student_username,student_username], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async create(student: Student): Promise<any> {
		const userStore = new UserStore();
		const user = await userStore.create({
			user_username: student.student_username,
			f_name: student.f_name as string,
			m_name: student.m_name as string,
			l_name: student.l_name as string,
		});

		return new Promise((resolve, reject) => {
			Pool.query(
				"INSERT INTO student VALUES (?, ?, ?);",
				[student.student_username, student.hashed_password, student.student_major],
				(err, results, fields) => {
					if (err) reject(err);

					return resolve(results); // results contains rows returned by server
				}
			);
		});
	}

	// async update(instructor_username: string, instructor: Instructor): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `UPDATE user
    //         SET f_name = ?, m_name = ?, l_name = ?
	// 		WHERE user_username = ?;
			
	// 		UPDATE instructor
    //         SET instructor_faculty = ?
	// 		WHERE instructor_username = ?;`;

	// 		const params = [
	// 			instructor.f_name,
	// 			instructor.m_name,
	// 			instructor.l_name,
	// 			instructor_username,
	// 			instructor.instructor_faculty,
	// 			instructor_username,
	// 		];

	// 		Pool.query(query, params, (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results); // results contains rows returned by server
	// 		});
	// 	});
	// }

	// async remove(instructor_username: string): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `
	// 		DELETE FROM instructor
	// 		WHERE instructor_username = ?;
			
	// 		DELETE FROM user
	// 		WHERE user_username = ?;`;


	// 		Pool.query(query, [instructor_username, instructor_username], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results); // results contains rows returned by server
	// 		});
	// 	});
	// }
}


export {
    Student,
    StudentStore,
}