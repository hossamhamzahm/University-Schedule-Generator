import Pool from "./database";


interface Section {
	section_id?: string;
	course_code: string;
	course_name?: string;
	section_name: string;
	section_type: string;
	section_day: string;
	section_from: string;
	section_to: string;
	instructor_name?: string;
	instructor_username?: string;
}


class SectionStore {
	async index(pageNo: number = 1, limit: number = 20): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
			SELECT * FROM section
			LEFT JOIN course
			ON course.course_code = section.course_code
			LIMIT ? OFFSET ?;`;

			const offset = (pageNo - 1) * limit;

			Pool.query(query, [limit, offset], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async show(course_code: string, section_name: string, section_type: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const params = [course_code, section_name, section_type];

			const query = `
            SELECT * FROM section 
            WHERE course_code = ? AND 
            section_name = ? AND section_type = ?;`;

			Pool.query(query, params, (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async showAllCourseSections(course_code: string, section_type: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const params = [course_code, section_type];

			const query = `
            SELECT * FROM section 
            WHERE course_code = ? AND 
            section_type = ?;`;

			Pool.query(query, params, (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async showCourseSections(course_code: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const query = `
            SELECT * FROM section 
            WHERE course_code = ?;`;

			Pool.query(query, [course_code], (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async create(section: Section): Promise<any> {
		return new Promise((resolve, reject) => {
			const params = [
				section.course_code,
				section.section_name,
				section.section_type,
				section.section_day,
				section.section_from,
				section.section_to,
				section.instructor_username,
				section.course_code,
				section.section_name,
				section.section_type,
			];

			const query = `
            INSERT INTO section 
			(course_code, section_name, section_type, section_day, section_from, section_to, instructor_username)
			VALUES (?, ?, ?, ?, ?, ?, ?);
            SELECT * FROM section 
            WHERE course_code = ? and 
            section_name = ? and section_type = ?`;

			Pool.query(query, params, (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async update(course_code: string, section_name: string, section_type: string, section: Section): Promise<any> {
		return new Promise((resolve, reject) => {
			const params = [
				section.section_day,
				section.section_from,
				section.section_to,
				section.instructor_username,
				course_code,
				section_name,
				section_type,
				course_code,
				section_name,
				section_type,
			];

			const query = `
            UPDATE section SET
            section_day = ?, section_from = ?, 
            section_to = ?, instructor_username = ?
            WHERE course_code = ? AND 
            section_name = ? AND section_type = ?;
            
            SELECT * FROM section
            WHERE course_code = ? AND 
            section_name = ? AND section_type = ?;`;

			Pool.query(query, params, (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async delete(course_code: string, section_name: string, section_type: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const params = [course_code, section_name, section_type];

			const query = `
            DELETE FROM section 
            WHERE course_code = ? AND 
            section_name = ? AND section_type = ?;`;

			Pool.query(query, params, (err, results, fields) => {
				if (err) reject(err);
				return resolve(results); // results contains rows returned by server
			});
		});
	}
}

export { Section, SectionStore };
