import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../data/reducers/posts.reducers";

const Post = ({ post, setCurrentId, setEditing, editing }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const user = useSelector((state) => state.auth).user;

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find((like) => like === (user?.googleId || user?._id)) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}
		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;Like
			</>
		);
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<CardMedia className={classes.media} image={post?.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} title={post.title} />
			<div className={classes.overlay}>
				<Typography variant="h6">{post?.name}</Typography>
				<Typography variant="body2">{moment(post?.createdAt).fromNow()}</Typography>
			</div>
			{(user?.googleId === post?.creator || user?._id === post?.creator) && (
				<div className={classes.overlay2}>
					<Button
						style={{ color: "white" }}
						size="small"
						onClick={() => {
							setEditing(!editing);
							setCurrentId(post?._id);
						}}
					>
						<MoreHorizIcon />
					</Button>
				</div>
			)}

			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary" component="h2">
					{post?.tags?.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<Typography className={classes.title} gutterBottom variant="h5" component="h2">
				{post?.title}
			</Typography>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{post?.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" disabled={!user} onClick={() => dispatch(likePost(post._id))}>
					<Likes />
				</Button>
				{(user?.googleId === post?.creator || user?._id === post?.creator) && (
					<Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
						<DeleteIcon fontSize="small" />
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
