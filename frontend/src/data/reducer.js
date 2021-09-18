import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPostAPI, deletePostAPI, getPostsAPI } from "./service";

export const getPosts = createAsyncThunk("social/posts", async () => {
	try {
		const response = await getPostsAPI();
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
});

export const createPost = createAsyncThunk("social/create", async (post) => {
	try {
		const response = await createPostAPI(post);
		if (response) {
			return response;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
});

export const deletePost = createAsyncThunk("social/delete", async (id) => {
	try {
		const response = await deletePostAPI(id);
		if (response) {
			return id;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
});

const initialState = {
	post: [],
};

export const postSlice = createSlice({
	name: "posts",
	initialState,
	reducer: {},
	extraReducers: {
		[getPosts.fulfilled]: (state, action) => {
			state.post = action.payload;
		},
		[createPost.fulfilled]: (state, action) => {
			state.post = [...state.post, action.payload];
		},
		[deletePost.fulfilled]: (state, action) => {
			state.post = state.post.filter((post) => post._id !== action.payload);
		},
	},
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
