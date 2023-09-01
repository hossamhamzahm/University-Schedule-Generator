import { DataTypes }  from "sequelize";
import sequelize from "./database";


const User = sequelize.define(
	"User",
	{
		user_username: {
			type: DataTypes.STRING(35),
			primaryKey: true
		},
		f_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		m_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		l_name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
	},
	
	{
		tableName: 'user',
		underscored: true,
		timestamps: true
	}
)


User.prototype.get_full_name = function() {
  return this.f_name + ' ' + this.m_name + ' ' + this.l_name;
};

export default User;
