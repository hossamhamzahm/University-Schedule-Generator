import { DataTypes } from "sequelize";
import sequelize from "./database";


const VisitCount = sequelize.define(
	"visit_count",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		}, 
		total_cnt: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		successfull_cnt: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	},

	{
		tableName: 'visit_count',
		underscored: true,
		timestamps: false,
	}
)

export default VisitCount;
