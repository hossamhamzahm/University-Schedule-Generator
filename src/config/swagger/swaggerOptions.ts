import swaggerJSDoc from "swagger-jsdoc";
import config from "..";


const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Schedule Generator API",
			version: "1.0.0",
		},
		servers: [
			{
				url: config.url,
			},
		],
	},

	apis: ["./src/config/**/*.yaml", "./config/**/*.yaml"], // "./**/*.ts", 
};

console.log(config.url)

export default swaggerOptions;