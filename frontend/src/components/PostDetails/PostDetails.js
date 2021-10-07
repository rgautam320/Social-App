import React, { useEffect } from "react";
import { Paper, Typography, Grid, Divider, CircularProgress } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../data/reducers/posts.reducers";
import useStyles from "./styles";
import Post from "../Posts/Post/Post";
import CommentSection from "./CommentSection";

const PostDetails = () => {
	const { post, singlePost } = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const classes = useStyles();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getPost(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (singlePost) {
			dispatch(getPostsBySearch({ page: 1, search: "none", tags: singlePost?.tags?.join(",") }));
		}
	}, [singlePost, dispatch]);

	const recommendedPosts = post?.filter((val) => val?._id !== singlePost?._id);

	return (
		<>
			{singlePost ? (
				<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
					<div className={classes.card}>
						<div className={classes.section}>
							<Typography variant="h3" component="h2">
								{singlePost?.title}
							</Typography>
							<Typography gutterBottom variant="h6" color="textSecondary" component="h2">
								{singlePost?.tags?.map((tag) => `#${tag} `)}
							</Typography>
							<Typography gutterBottom variant="body1" component="p">
								{singlePost?.message}
							</Typography>
							<Typography variant="h6">Created by: {singlePost?.name}</Typography>
							<Typography variant="body1">{moment(singlePost?.createdAt).fromNow()}</Typography>
							<Divider style={{ margin: "20px 0" }} />
							<Typography variant="body1">
								<strong>Realtime Chat - coming soon!</strong>
							</Typography>
							<Divider style={{ margin: "20px 0" }} />
							<CommentSection />
							<Divider style={{ margin: "20px 0" }} />
						</div>
						<div className={classes.imageSection}>
							<img className={classes.media} src={singlePost?.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} alt={post?.title} />
						</div>
					</div>
					{!!recommendedPosts?.length && (
						<div className={classes.section}>
							<Typography gutterBottom variant="h5">
								You might also like:
							</Typography>
							<Divider style={{ marginBottom: "1rem" }} />
							<div className={classes.recommendedPosts}>
								<Grid className={classes.container} container alignItems="stretch" spacing={3}>
									{recommendedPosts.map((val, ind) => (
										<Grid key={ind} item xs={12} sm={6} md={4} lg={3} xl={3}>
											<Post post={val} />
										</Grid>
									))}
								</Grid>
							</div>
						</div>
					)}
				</Paper>
			) : (
				<center style={{ marginTop: "1rem" }}>
					<CircularProgress size="5em" />
				</center>
			)}
		</>
	);
};

export default PostDetails;
