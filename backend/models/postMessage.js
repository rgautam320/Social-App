import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	tags: [String],
	selectedFile: String,
	likes: {
		type: [String],
		default: [],
	},
	comments: {
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("postMessage", PostSchema);
