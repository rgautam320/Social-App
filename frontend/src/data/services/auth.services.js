import { signin, signup } from "../api";

export const userLoginAPI = async (data) => {
	const response = await signin(data);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const userSignupAPI = async (data) => {
	const response = await signup(data);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};
