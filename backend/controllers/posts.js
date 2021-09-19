import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
	try {
		const postMessage = await PostMessage.find();
		res.status(200).json(postMessage);
	} catch (error) {
		res.status(404).json({ message: error.message() });
	}
};

export const createPost = async (req, res) => {
	const { title, message, selectedFile, creator, tags } = req.body;
	const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });
	try {
		await newPostMessage.save();
		res.status(201).json(newPostMessage);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post with id: ${id}`);
	} else {
		try {
			await PostMessage.findByIdAndRemove(id);
			res.json({ message: "Post deleted successfully." });
		} catch (error) {
			console.log(error);
		}
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No Post with ID: ${id}`);
	} else {
		try {
			const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
			res.json(updatedPost);
		} catch (error) {
			console.log(error);
		}
	}
};

export const likePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post with ID: ${id}`);
	} else {
		try {
			const post = await PostMessage.findById(id);
			const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
			res.json(updatedPost);
		} catch (error) {
			console.log(error);
		}
	}
};
