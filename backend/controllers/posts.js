import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
	const { page } = req.query;
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT;
		const total = await PostMessage.countDocuments({});
		const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
		res.status(200).json({ posts: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags, page } = req.query;
	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT;
		const title = new RegExp(searchQuery, "i");
		const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);
		const totalMatch = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });
		const total = totalMatch?.length;
		res.status(200).json({ posts: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await PostMessage.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	const newPostMessage = new PostMessage({ ...post, createdAt: new Date().toISOString() });
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
		const post = await PostMessage.findById(id);
		const index = post.likes.findIndex((id) => id === String(req.userId));
		if (index === -1) {
			post.likes.push(req.userId);
		} else {
			post.likes = post.likes.filter((id) => id !== String(req.userId));
		}
		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
		res.json(updatedPost);
	}
};
