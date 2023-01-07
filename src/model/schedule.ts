import Pool from "./database";
import { DayPopulated } from "./day";


interface Schedule {
	user_username: string;
	is_stared: boolean;
	is_archived: boolean;
	is_registered: boolean;

	schedule_id: number;

	sunday_id: number;
	monday_id: number;
	tuesday_id: number;
	wednesday_id: number;
	thursday_id: number;
}



interface SchedulePopulated {
	user_username?: string;
	is_stared?: boolean;
	is_archived?: boolean;
	is_registered?: boolean;

	schedule_id?: number;

	sunday: DayPopulated;
	monday: DayPopulated;
	tuesday: DayPopulated;
	wednesday: DayPopulated;
	thursday: DayPopulated;
}


class ScheduleStore {
	async index(pageNo: number = 1, limit: number = 20, user: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
                SELECT * FROM schedule
				WHERE user_username = ?
                LIMIT ? OFFSET ?;`;

			const offset = (pageNo - 1) * limit;
			Pool.query(query, [user, limit, offset], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	// async show(course_code: string): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `
    //             SELECT * FROM course
    //             WHERE course.course_code = ?;`;

	// 		Pool.query(query, [course_code], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results); // results contains rows returned by server
	// 		});
	// 	});
	// }

	// async create(course: Course): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `INSERT INTO course VALUES (?, ?);`;

	// 		Pool.query(query, [course.course_code, course.course_name, course.course_code], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results); // results contains rows returned by server
	// 		});
	// 	});
	// }

	// async update(course: Course): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `
    //         UPDATE course SET course_name = ? WHERE course_code = ?;
    //         SELECT * FROM course WHERE course_code = ?;`;

	// 		Pool.query(query, [course.course_name, course.course_code, course.course_code], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results);
	// 		});
	// 	});
	// }

	// async remove(course_code: string): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `
    //         DELETE FROM course WHERE course_code = ?;`;

	// 		Pool.query(query, [course_code], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results);
	// 		});
	// 	});
	// }
}

export { Schedule, SchedulePopulated, ScheduleStore };
