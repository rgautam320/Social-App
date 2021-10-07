import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { deletePost, getPosts, likePost } from "../../../data/reducers/posts.reducers";

const Post = ({ post, setCurrentId, setEditing, editing }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();

	const user = useSelector((state) => state.auth).user;

	const [likes, setLikes] = useState(post?.likes);

	const userId = user?.googleId || user?._id;
	const hasLikedPost = post?.likes?.find((like) => like === userId);

	const handleLike = async () => {
		dispatch(likePost(post._id));

		if (hasLikedPost) {
			setLikes(likes?.filter((id) => id !== userId));
		} else {
			setLikes([...post.likes, userId]);
		}
	};

	const Likes = () => {
		if (likes?.length > 0) {
			return likes?.find((like) => like === (user?.googleId || user?._id)) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;{likes?.length > 2 ? `You and ${likes?.length - 1} others` : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
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
			<ButtonBase component="span" name="test" className={classes.cardAction} onClick={() => history.push(`/posts/${post?.title?.toLowerCase()?.replace(/ /g, "-")}/${post?._id}`)}>
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
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" disabled={!user} onClick={() => handleLike(post._id)}>
					<Likes />
				</Button>
				{(user?.googleId === post?.creator || user?._id === post?.creator) && (
					<Button
						size="small"
						color="secondary"
						onClick={() => {
							dispatch(deletePost(post._id));
							dispatch(getPosts(1));
						}}
					>
						<DeleteIcon fontSize="small" />
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
