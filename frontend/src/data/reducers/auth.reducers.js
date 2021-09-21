import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
			state.user = action.payload;
			state.isLoggedIn = false;
		},
		[setUser.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
