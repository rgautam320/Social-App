import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);
			if (isPasswordCorrect) {
				const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "secret", { expiresIn: "1h" });

				res.status(200).json({ result: existingUser, token });
			} else {
				res.status(400).json({ message: "Password is not correct." });
			}
		} else {
			res.status(500).json({ message: "Something went wrong." });
		}
	} catch (error) {
		res.status(500).json({ message: error.message() });
	}
};

export const signup = async (req, res) => {
	const { email, firstName, lastName, password, confirmPassword } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: "User already exists." });
		} else {
			if (password !== confirmPassword) {
				res.status(400).json({ message: "Passwords don't match" });
			} else {
				const hashedPassword = await bycrypt.hash(password, 12);

				const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

				const token = jwt.sign({ email: result.email, id: result._id }, "secret", { expiresIn: "1h" });

				res.status(200).json({ result, token });
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message() });
	}
};
