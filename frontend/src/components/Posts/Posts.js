import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, editing, setEditing }) => {
	const posts = useSelector((state) => state.posts);
	const classes = useStyles();

	return !posts?.post?.length ? (
		<center>
			<CircularProgress />
		</center>
	) : (
		<Grid className={classes.container} container alignItems="stretch" spacing={3}>
			{posts?.post?.map((val) => (
				<Grid key={val._id} item xs={12} sm={6} md={4} xl={3}>
					<Post post={val} setCurrentId={setCurrentId} setEditing={setEditing} editing={editing} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
