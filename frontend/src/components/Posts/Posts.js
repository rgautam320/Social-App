import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, editing, setEditing }) => {
	const posts = useSelector((state) => state.posts);
	const { loading } = useSelector((state) => state.loading);
	const classes = useStyles();

	if (!posts?.post?.length && !loading) {
		return (
			<center>
				<Typography variant="h3">No Posts</Typography>
			</center>
		);
	}

	return (
		<>
			{loading ? (
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
			)}
		</>
	);
};

export default Posts;
