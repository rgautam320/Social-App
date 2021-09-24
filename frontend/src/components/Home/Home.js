import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../data/reducers/posts.reducers";
import { logout } from "../../data/reducers/auth.reducers";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import decode from "jwt-decode";

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [currentId, setCurrentId] = useState(0);
	const [editing, setEditing] = useState(false);

	const token = JSON.parse(localStorage.getItem("token"));

	useEffect(() => {
		dispatch(getPosts());
		if (token) {
			const decodedData = decode(token);
			if (decodedData * 1000 < new Date().getTime()) {
				dispatch(logout());
			}
		}
	}, [dispatch, token]);

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
