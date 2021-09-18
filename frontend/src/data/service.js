import * as api from "./api";

export const getPostsAPI = async () => {
	const response = await api.fetchPosts();
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const createPostAPI = async (payload) => {
	const response = await api.createPost(payload);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};

export const deletePostAPI = async (id) => {
	const response = await api.deletePost(id);
	if (response?.data) {
		return response?.data;
	} else {
		return null;
	}
};
