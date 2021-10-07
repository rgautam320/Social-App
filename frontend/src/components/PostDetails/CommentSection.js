import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../data/reducers/posts.reducers";
import useStyles from "./styles";

const CommentSection = () => {
	const { singlePost } = useSelector((state) => state.posts);
	const user = useSelector((state) => state.auth).user;
	const [comment, setComment] = useState("");
	const dispatch = useDispatch();
	const [comments, setComments] = useState([]);
	const classes = useStyles();
	const commentsRef = useRef();

	const handleComment = async () => {
		const payload = {
			value: `${user?.name}: ${comment}`,
			id: singlePost?._id,
		};
		const newComments = await dispatch(commentPost(payload));

		setComment("");

		setComments(newComments?.payload?.comments);

		commentsRef.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		setComments(singlePost?.comments);
	}, [singlePost?.comments]);

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					{comments.length > 0 &&
						comments?.map((c, i) => (
							<Typography key={i} gutterBottom variant="subtitle1">
								<strong>{c.split(": ")[0]}</strong>
								{c.split(":")[1]}
							</Typography>
						))}
					<div ref={commentsRef} />
				</div>
				{user && (
					<div style={{ width: "40%" }}>
						<Typography gutterBottom variant="h6">
							Write a comment
						</Typography>
						<TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
						<br />
						<Button style={{ marginTop: "10px" }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
							Comment
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
