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
		faculty: {
			type: DataTypes.ENUM,
			values: ['Engineering', 'Business', 'Computer Science'],
			validate: {
				
				isIn: {
					args: [['Engineering', 'Business', 'Computer Science']],
					msg: "Faculty must be one of the following: ['Engineering', 'Business', 'Computer Science']",
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
				fields: ['faculty']
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