import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { createPost, getPosts, updatePost } from "../../data/reducers/posts.reducers";

const initialState = { title: "", message: "", selectedFile: "" };

const Form = ({ currentId, setCurrentId, editing, setEditing }) => {
	const [postData, setPostData] = useState(initialState);
	const post = useSelector((state) => (currentId ? state?.posts?.post?.find((message) => message._id === currentId) : null));
	const user = useSelector((state) => state.auth).user;
	const isLoggedIn = useSelector((state) => state.auth).isLoggedIn;

	const dispatch = useDispatch();
	const classes = useStyles();

	const [tags, setTags] = useState([]);
	const [error, setError] = useState("");

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

	const clear = () => {
		setCurrentId(0);
		setEditing(false);
		setPostData(initialState);
		setTags([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (postData.title && postData.message && tags.length > 0) {
			if (!editing) {
				dispatch(createPost({ ...postData, tags: tags, name: user?.name, creator: user?._id }));
				dispatch(getPosts(1));
			} else {
				dispatch(
					updatePost({
						id: currentId,
						post: { ...postData, tags: tags, name: user?.name },
					})
				);
			}
			clear();
		} else {
			setError("All the fields are required.");
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	};

	useEffect(() => {
		if (post && currentId && editing) {
			setPostData(post);
			setTags(post.tags);
		}
		if (!editing) {
			setPostData({ title: "", message: "", tags: "", selectedFile: "" });
		}
	}, [post, currentId, editing]);

	if (!isLoggedIn) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Signin to create your own Posts.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper} elevation={3}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">{editing ? `Editing '${post?.title}'` : "Creating a Memory"}</Typography>
				<TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField required name="message" variant="outlined" label="Message" fullWidth multiline rows={3} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
				<ChipInput style={{ margin: "0 0.5rem" }} required value={tags} onAdd={(chip) => handleAddChip(chip)} fullWidth onDelete={(chip) => handleDeleteChip(chip)} label="Add Tags" variant="outlined" />
				<div className={classes.fileInput}>
					<FileBase className={classes.imageSelection} type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
				</div>
				{error && (
					<Typography variant="h6" className={classes.error}>
						{error}
					</Typography>
				)}
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
					Submit
				</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
