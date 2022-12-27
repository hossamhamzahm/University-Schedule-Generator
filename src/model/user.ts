import Pool from "./database";

interface User {
	user_username: string;
	f_name: string;
	m_name: string;
	l_name: string;
}

class UserStore {
	async index(): Promise<any> {
		return new Promise((resolve, reject) => {
			Pool.query("SELECT * FROM user;", (err, results, fields) => {
				if (err) reject(err);
				Pool.end();
				return resolve(results); // results contains rows returned by server
			});
		});
	}

	async create(user: User): Promise<any> {
		return new Promise((resolve, reject) => {
			Pool.query("INSERT INTO user VALUES (?, ?, ?, ?);", [user.user_username, user.f_name, user.m_name, user.l_name], (err, results, fields) => {
				if (err) reject(err);

				return resolve(results); // results contains rows returned by server
			});
		});
	}
}

export { 
    User,
    UserStore,
};
