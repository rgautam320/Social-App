import axios from "axios";

const url = `${process.env.REACT_APP_API}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (post) => axios.post(url, post);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const likePost = (id) => axios.patch(`${url}/${id}/like`);
