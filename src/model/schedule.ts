import { DataTypes } from "sequelize";
import sequelize from "./database";
import Day from "./day";
import Student from "./student";


const Schedule = sequelize.define(
	'schedule',
	{
		schedule_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		student_username: {
			type: DataTypes.STRING(24),
			allowNull: true,
			references: {
				model: Student,
				key: 'student_username'
			}
		},
		is_stared: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		is_registered: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		sunday_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Day,
				key: 'day_id'
			}
		},
		monday_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Day,
				key: 'day_id'
			}
		},
		tuesday_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Day,
				key: 'day_id'
			}
		},
		wednesday_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Day,
				key: 'day_id'
			}
		},
		thursday_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Day,
				key: 'day_id'
			}
		}
	},
	{
		tableName: 'schedule',
		underscored: true,
		timestamps: false,
	}
)


let days = ['sunday_id','monday_id', 'tuesday_id', 'wednesday_id', 'thursday_id'];
for (let day of days){
	Schedule.belongsTo(Day, {
		foreignKey: day,
		targetKey: 'day_id',
		onDelete: 'CASCADE',
	})
}


Schedule.belongsTo(Student, {
	foreignKey: 'student_username',
	targetKey: 'student_username',
	onDelete: 'CASCADE',
})

export default Schedule;