import sequelize from "./database";
import { DataTypes } from "sequelize";
import Section from "./section";


const Day = sequelize.define(
	'Day', 
	{
		day_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		hour_1_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_2_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_3_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_4_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_5_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_6_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_7_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_8_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_9_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_10_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_11_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		},
		hour_12_section_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Section,
				key: 'section_id'
			}
		}
	},
	{
		tableName: 'day',
		underscored: true,
		timestamps: false,
	}
);

for(const attr in Day.getAttributes()){
	if(attr == 'day_id') continue;
	// console.log(attr)
	
	Day.belongsTo(Section, {
		foreignKey: attr,
		targetKey: 'section_id',
		onDelete: 'CASCADE',
	})
}



export default Day;