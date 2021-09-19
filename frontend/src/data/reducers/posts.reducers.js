import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPostAPI, deletePostAPI, getPostsAPI, likePostAPI, updatePostAPI } from "../services/posts.services";

export const getPosts = createAsyncThunk("social/posts", async () => {
	try {
		const response = await getPostsAPI();
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

export const updatePost = createAsyncThunk("social/update", async (payload) => {
	try {
		const response = await updatePostAPI(payload.id, payload.post);
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

export const likePost = createAsyncThunk("social/like", async (id) => {
	try {
		const response = await likePostAPI(id);
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
		[updatePost.fulfilled]: (state, action) => {
			state.post = state.post.map((post) => (post._id === action.payload._id ? action.payload : post));
		},
		[likePost.fulfilled]: (state, action) => {
			state.post = state.post.map((post) => (post._id === action.payload._id ? action.payload : post));
		},
	},
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
