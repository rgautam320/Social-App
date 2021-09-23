import axios from "axios";

const API = axios.create({ baseURL: `${process.env.REACT_APP_API}` });
const token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

API.interceptors.request.use((req) => {
	if (localStorage.getItem("token")) {
		req.headers.Authorization = token;
	}

	return req;
});

export const fetchPosts = () => API.get(`/posts`);
export const createPost = (post) => API.post(`/posts`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const signin = (data) => API.post(`/user/signin`, data);
export const signup = (data) => API.post(`/user/signup`, data);
