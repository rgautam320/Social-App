import axios from "axios";

const url = `${process.env.REACT_APP_API}`;

export const fetchPosts = () => axios.get(`${url}/posts`);
export const createPost = (post) => axios.post(`${url}/posts`, post);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/posts/${id}`, updatedPost);
export const likePost = (id) => axios.patch(`${url}/posts/${id}/like`);

export const signin = (data) => axios.post(`${url}/user/signin`, data);
export const signup = (data) => axios.post(`${url}/user/signup`, data);
