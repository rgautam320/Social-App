import { createPost, deletePost, likePost, updatePost, fetchPosts } from "../api";

export const getPostsAPI = async () => {
	const response = await fetchPosts();
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const createPostAPI = async (payload) => {
	const response = await createPost(payload);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const deletePostAPI = async (id) => {
	const response = await deletePost(id);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const updatePostAPI = async (id, post) => {
	const response = await updatePost(id, post);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const likePostAPI = async (id) => {
	const response = await likePost(id);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};
