import { DataTypes } from "sequelize";
import sequelize from "./database";
import Section from "./section";


const Course = sequelize.define(
	"course",
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
