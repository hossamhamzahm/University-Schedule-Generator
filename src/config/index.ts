import path from "path";
import dotenv from "dotenv";

if(process.env.NODE_ENV != "prod")
    dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });


console.log(process.env.URL)

export default{
    port: process.env.PORT || 3030,
    url: process.env.URL || 'http://localhost:' + (process.env.PORT || 3030),
    db_url: process.env.DB_URL || 'localhost',
    db_user: process.env.DB_USER as string,
    db_password: process.env.DB_PASSWORD as string,
    db_name: process.env.DB_NAME as string,
    db_user_dev: process.env.DB_USER_DEV as string,
    db_password_dev: process.env.DB_PASSWORD_DEV as string,
    db_name_dev: process.env.DB_NAME_DEV as string,
    db_host: process.env.DB_HOST as string,
    db_port: parseInt(<string>process.env.DB_PORT),
    access_token_secret: <string>process.env.ACCESS_TOKEN_SECRET as string,
    refresher_token_secret: <string>process.env.REFRESHER_TOKEN_SECRET as string,
    bcrypt_pepper: <string>process.env.BCRYPT_PEPPER,
    salt_rounds: parseInt(<string>process.env.SALT_ROUNDS),
    power_campus_username: process.env.POWER_CAMPUS_USERNAME,
    power_campus_password: process.env.POWER_CAMPUS_PASSWORD
}