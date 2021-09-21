import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../data/reducers/posts.reducers";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [currentId, setCurrentId] = useState(0);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} setEditing={setEditing} editing={editing} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} editing={editing} setEditing={setEditing} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
