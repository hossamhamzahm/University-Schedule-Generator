import Pool from "./database";

interface Instructor {
	instructor_username: string;
	f_name?: string;
	m_name?: string;
	l_name?: string;
    instructor_faculty?: string;
}


class InstructorStore {
	async index(): Promise<any> {
		return new Promise((resolve, reject) => {
            const query = 
            `SELECT * 
            FROM instructor
            LEFT JOIN user
            ON instructor_username = user_username;`;

			Pool.query(query, (err, results, fields) => {
				if (err) reject(err);
				Pool.end();
				return resolve(results); // results contains rows returned by server
				// console.log(fields);
			});
		});
	}

	async create(instructor: Instructor): Promise<any> {
		return new Promise((resolve, reject) => {
			Pool.query("INSERT INTO instructor VALUES (?, ?);", [instructor.instructor_username, instructor.instructor_faculty], (err, results, fields) => {
				if (err) reject(err);

				return resolve(results); // results contains rows returned by server
				// console.log(fields);
			});
		});
	}
}


export {
    Instructor,
    InstructorStore,
}