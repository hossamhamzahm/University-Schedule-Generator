import config from '../config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite_storage/database.sqlite'
});

export default sequelize;