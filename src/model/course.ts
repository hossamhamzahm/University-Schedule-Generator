import { DataTypes } from "sequelize";
import sequelize from "./database";


const Course = sequelize.define(
	"Course",
	{
		course_code: {
			type: DataTypes.STRING(12),
			primaryKey: true
		},
		course_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		}
	},

	{
		tableName: 'course',
		underscored: true,
		timestamps: false,
		indexes: [
			{
				unique: false,
				fields: ['course_name']
			}
		]
	}
)


export default Course;
