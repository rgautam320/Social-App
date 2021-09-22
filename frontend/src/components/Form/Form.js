import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../data/reducers/posts.reducers";

const initialState = { creator: "", title: "", message: "", tags: "", selectedFile: "" };

const Form = ({ currentId, setCurrentId, editing, setEditing }) => {
	const [postData, setPostData] = useState(initialState);
	const post = useSelector((state) => (currentId ? state?.posts?.post?.find((message) => message._id === currentId) : null));
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
			dispatch(createPost(postData));
		} else {
			dispatch(
				updatePost({
					id: currentId,
					post: postData,
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
			setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
		}
	}, [post, currentId, editing]);

	return (
		<Paper className={classes.paper}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">{editing ? `Editing '${post?.title}'` : "Creating a Memory"}</Typography>
				<TextField required name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
				<TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
				<TextField required name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
				<TextField required name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
				<div className={classes.fileInput}>
					<FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
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
