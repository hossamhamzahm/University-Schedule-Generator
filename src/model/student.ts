import { DataTypes } from "sequelize";
import sequelize from "./database";
import User from './user'


const Student = sequelize.define(
	'Student',
	{
		student_username: {
			type: DataTypes.STRING(35),
			primaryKey: true,
			references: {
				model: User,
				key: 'user_username',
			},
		},
		hashed_password: {
			type: DataTypes.STRING(200),
			allowNull: false
		}, 
		can_edit: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		student_faculty: {
			type: DataTypes.ENUM,
			values: ['EAS', 'Business', 'CS'],
			validate: {

				isIn: {
					args: [['EAS', 'Business', 'CS']],
					msg: "Faculty must be one of the following: ['EAS', 'Business', 'CS']",
				}
			}
		}
	},

	{
		tableName: 'student',
		underscored: true,
		indexes: [
			{
				unique: false,
				fields: ['student_faculty']
			}
		]
	}
);


Student.belongsTo(User, {
	foreignKey: "student_username",
	targetKey: "user_username",
	onDelete: "CASCADE",
});


export default Student