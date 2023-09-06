import { DataTypes } from "sequelize";
import sequelize from "./database";
import User from "./user";



const LoggedJwt = sequelize.define(
    "logged_jwt",
    {
        jwt_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_username: {
            type: DataTypes.STRING(35),
            references: {
                model: User,
                key: 'user_username',
            },
            unique: false
        },
        token: {
            type: DataTypes.STRING(400),
            unique: true,
        },
        expiry_date: {
            type: DataTypes.DATE,
            unique: false,
        },
    },
    {
        tableName: "logged_jwt",
        underscored: true,
        timestamps: false,
        indexes: [
            {
                name: "token_idx",
                using: "BTREE",
                fields: ["token"]
            }
        ]
    }
);


// User.hasMany(LoggedJwt);
LoggedJwt.belongsTo(User, {
    foreignKey: 'user_username',
    targetKey: 'user_username',
    onDelete: 'CASCADE',
});

export default LoggedJwt;