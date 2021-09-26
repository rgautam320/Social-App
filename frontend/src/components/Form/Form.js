import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../data/reducers/posts.reducers";

const initialState = { title: "", message: "", tags: "", selectedFile: "" };

const Form = ({ currentId, setCurrentId, editing, setEditing }) => {
	const [postData, setPostData] = useState(initialState);
	const post = useSelector((state) => (currentId ? state?.posts?.post?.find((message) => message._id === currentId) : null));
	const user = useSelector((state) => state.auth).user;
	const isLoggedIn = useSelector((state) => state.auth).isLoggedIn;

	const dispatch = useDispatch();
	const classes = useStyles();

	const clear = () => {
		setCurrentId(0);
		setEditing(false);
		setPostData(initialState);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!editing) {
			dispatch(createPost({ ...postData, name: user?.name, creator: user?._id }));
		} else {
			dispatch(
				updatePost({
					id: currentId,
					post: { ...postData, name: user?.name },
				})
			);
		}
		clear();
	};

	useEffect(() => {
		if (post && currentId && editing) {
			setPostData(post);
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
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">{editing ? `Editing '${post?.title}'` : "Creating a Memory"}</Typography>
				<TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField required name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
				<TextField required name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
				<div className={classes.fileInput}>
					<FileBase className={classes.imageSelection} type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
				</div>
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
