import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPostAPI, deletePostAPI, getPostsAPI, getPostAPI, likePostAPI, updatePostAPI, getPostsBySearchAPI, commentPostAPI } from "../services/posts.services";

export const getPosts = createAsyncThunk("social/posts", async (page) => {
	try {
		const response = await getPostsAPI(page);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
});

export const getPostsBySearch = createAsyncThunk("social/postsBySearch", async (searchQuery) => {
	try {
		const response = await getPostsBySearchAPI(searchQuery);
		return response;
	} catch (error) {
		console.log(error);
	}
});

export const getPost = createAsyncThunk("social/post", async (id) => {
	try {
		const response = await getPostAPI(id);
		return response;
	} catch (error) {
		console.log(error);
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
	const token = JSON.parse(localStorage.getItem("token"));
	try {
		const response = await likePostAPI(id, token);
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

export const commentPost = createAsyncThunk("social/comment", async (payload) => {
	try {
		const response = await commentPostAPI(payload.value, payload.id);
		console.log(response);
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
	numberOfPages: null,
	currentPage: null,
	singlePost: null,
};

export const postSlice = createSlice({
	name: "posts",
	initialState,
	extraReducers: {
		[getPosts.fulfilled]: (state, action) => {
			state.post = action.payload?.posts;
			state.currentPage = action.payload?.currentPage;
			state.numberOfPages = action.payload?.numberOfPages;
			state.singlePost = null;
		},
		[getPostsBySearch.fulfilled]: (state, action) => {
			state.post = action.payload?.posts;
			state.currentPage = action.payload?.currentPage;
			state.numberOfPages = action.payload?.numberOfPages;
		},
		[getPost.fulfilled]: (state, action) => {
			state.singlePost = action.payload;
		},
		[createPost.fulfilled]: (state, action) => {
			state.post = [...state.post, action.payload];
		},
		[deletePost.fulfilled]: (state, action) => {
			state.post = state.post?.filter((post) => post._id !== action.payload);
		},
		[updatePost.fulfilled]: (state, action) => {
			state.post = state.post?.map((post) => (post._id === action.payload?._id ? action.payload : post));
		},
		[likePost.fulfilled]: (state, action) => {
			state.post = state.post?.map((post) => (post?._id === action?.payload?._id ? action?.payload : post));
		},
		[commentPost.fulfilled]: (state, action) => {
			state.singlePost = action.payload;
		},
	},
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
