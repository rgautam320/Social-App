import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomToken = token < 500;
		let decodedData;
		if (token && isCustomToken) {
			decodedData = jwt.verify(token, "secret");
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
