import Pool from "./database";
import {Section} from "./section";


interface Day {
	day_id?: number;
	hour_1_section_id: number;
	hour_2_section_id: number;
	hour_3_section_id: number;
	hour_4_section_id: number;
	hour_5_section_id: number;
	hour_6_section_id: number;
	hour_7_section_id: number;
	hour_8_section_id: number;
	hour_9_section_id: number;
	hour_10_section_id: number;
	hour_11_section_id: number;
	hour_12_section_id: number;
}


interface DayPopulated {
	day_id?: number;
	hour_1_section: Section | null;
	hour_2_section: Section | null;
	hour_3_section: Section | null;
	hour_4_section: Section | null;
	hour_5_section: Section | null;
	hour_6_section: Section | null;
	hour_7_section: Section | null;
	hour_8_section: Section | null;
	hour_9_section: Section | null;
	hour_10_section: Section | null;
	hour_11_section: Section | null;
	hour_12_section: Section | null;
}

const nullDayPopulated = {
	hour_1_section: null,
	hour_2_section: null,
	hour_3_section: null,
	hour_4_section: null,
	hour_5_section: null,
	hour_6_section: null,
	hour_7_section: null,
	hour_8_section: null,
	hour_9_section: null,
	hour_10_section: null,
	hour_11_section: null,
	hour_12_section: null,
};




class DayStore {
	// async index(pageNo: number = 1, limit: number = 20, user: string): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		const query = `
    //             SELECT * FROM schedule
	// 			WHERE user_username = ?
    //             LIMIT ? OFFSET ?;`;

	// 		const offset = (pageNo - 1) * limit;
	// 		Pool.query(query, [user, limit, offset], (err, results, fields) => {
	// 			if (err) reject(err);
	// 			return resolve(results); // results contains rows returned by server
	// 		});
	// 	});
	// }

	async show(day_id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
                SELECT * FROM day
                WHERE day_id = ?;`;

			Pool.query(query, [day_id], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

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

export { Day, DayPopulated, DayStore, nullDayPopulated };
