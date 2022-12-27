import Pool from "./database";

interface Course {
	course_code: string;
	course_name: string;
}

class CourseStore {
	async index(pageNo: number = 1, limit: number = 20): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
                SELECT * FROM course
                LIMIT ? OFFSET ?;`;

			const offset = (pageNo - 1) * limit;
			Pool.query(query, [limit, offset], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async show(course_code: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
                SELECT * FROM course
                WHERE course.course_code = ?;`;

			Pool.query(query, [course_code], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async create(course: Course): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `INSERT INTO course VALUES (?, ?);`;

			Pool.query(query, [course.course_code, course.course_name, course.course_code], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async update(course: Course): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
            UPDATE course SET course_name = ? WHERE course_code = ?;
            SELECT * FROM course WHERE course_code = ?;`;

			Pool.query(query, [course.course_name, course.course_code, course.course_code], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results);
			});
		});
	}

	async remove(course_code: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
            DELETE FROM course WHERE course_code = ?;`;

			Pool.query(query, [course_code], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results);
			});
		});
	}
}

export { Course, CourseStore };
