import jwt from "jsonwebtoken";

const sign = async(student_username: string) => {
	const access_token_secret = process.env.ACCESS_TOKEN_SECRET as string;
	const signed = await jwt.sign(
		{ student_username, iat: Math.floor(Date.now() / 1000) },
		access_token_secret,
		{ expiresIn: 60 * 60 * 24 }
	);
	// { expiresIn: 60 * 60 });

	return signed;
}



export default {
    sign
}