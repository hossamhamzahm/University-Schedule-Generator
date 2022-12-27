import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Schedule Generator API",
			version: "1.0.0",
		},
		servers: [
			{
				url: "http://localhost:3000/",
			},
		],
	},

	apis: ["./src/**/*.ts"],
};


export default swaggerOptions;