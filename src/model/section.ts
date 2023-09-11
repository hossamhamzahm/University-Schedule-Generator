import { DataTypes } from "sequelize";
import sequelize from "./database";
import Course from "./course";
import Instructor from "./instructor";


const Section = sequelize.define(
	'section',
	{
		section_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		course_code: {
			type: DataTypes.STRING(35),
			references: {
				model: Course,
				key: 'course_code',
			},
		},
		instructor_username: {
			type: DataTypes.STRING(30),
			references: {
				model: Instructor,
				key: 'instructor_username',
			},
		},
		section_name: {
			type: DataTypes.STRING(4),
			allowNull: false
		},
		section_type: {
			type: DataTypes.ENUM,
			values: ['Lecture', 'Lab', 'Tutorial'],
			validate: {

				isIn: {
					args: [['Lecture', 'Lab', 'Tutorial']],
					msg: "Section type must be one of the following: ['Lecture', 'Lab', 'Tutorial']",
				}
			}
		},
		section_day: {
			type: DataTypes.ENUM,
			values: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			validate: {
				isIn: {
					args: [['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']],
					msg: "Section day must be one of the following: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']",
				}
			}
		},
		section_to: {
			type: DataTypes.TIME,
			allowNull: false
		},
		section_from: {
			type: DataTypes.TIME,
			allowNull: false
		}
	},

	{
		tableName: 'section',
		timestamps: false,
		underscored: true,
		indexes: [
			{
				using: 'Btree',
				unique: true,
				fields: ['course_code', 'section_name', 'section_type']
			}
		]
	}
);

Course.hasMany(Section, {
	foreignKey: 'course_code'
});

Section.belongsTo(Course, {
	foreignKey: "course_code",
	targetKey: "course_code",
	onDelete: "CASCADE",
});

Section.belongsTo(Instructor, {
	foreignKey: "instructor_username",
	targetKey: "instructor_username",
	onDelete: "CASCADE",
});


export default Section