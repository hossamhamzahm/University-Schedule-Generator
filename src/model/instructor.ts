import { DataTypes } from "sequelize";
import sequelize from "./database";
import User from './user'


const Instructor = sequelize.define(
	'Instructor',
	{
		instructor_username: {
			type: DataTypes.STRING(35),
			primaryKey: true,
			references: {
				model: User,
				key: 'user_username',
			},
		},
		instructor_faculty: {
			type: DataTypes.ENUM,
			values: ['EAS', 'Business', 'CS'],
			allowNull: true,
			validate: {

				isIn: {
					args: [['EAS', 'Business', 'CS']],
					msg: "Faculty must be one of the following: ['EAS', 'Business', 'CS']",
				}
			}
		}
	},

	{
		tableName: 'instructor',
		underscored: true,
		indexes: [
			{
				unique: false,
				fields: ['instructor_faculty']
			}
		]
	}
);


Instructor.belongsTo(User, {
	foreignKey: "instructor_username",
	targetKey: "user_username",
	onDelete: "CASCADE",
});


export default Instructor