import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLoginAPI, userSignupAPI } from "../services/auth.services";

const initialState = {
	user: null,
	isLoggedIn: false,
};

export const googleSignin = createAsyncThunk("social/auth", async (response) => {
	localStorage.setItem("profile", JSON.stringify(response?.result));
	localStorage.setItem("token", JSON.stringify(response?.token));
	return response?.result;
});

export const setUser = createAsyncThunk("social/set", async (response) => {
	return response;
});

export const logout = createAsyncThunk("social/lougout", async () => {
	localStorage.clear();
	return null;
});

export const signin = createAsyncThunk("social/signin", async (form) => {
	const response = await userLoginAPI(form);

	if (response?.result) {
		localStorage.setItem("profile", JSON.stringify(response?.result));
		localStorage.setItem("token", JSON.stringify(response?.token));

		return response?.result;
	}
});

export const signup = createAsyncThunk("social/signup", async (form) => {
	const response = await userSignupAPI(form);

	if (response?.result) {
		localStorage.setItem("profile", JSON.stringify(response?.result));
		localStorage.setItem("token", JSON.stringify(response?.token));

		return response?.result;
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducer: {},
	extraReducers: {
		[googleSignin.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		[logout.fulfilled]: (state, action) => {
			state.user = null;
			state.isLoggedIn = false;
		},
		[setUser.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		[signin.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		[signup.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
