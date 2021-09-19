import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import memories from "./assets/logo.png";
import { getPosts } from "./data/reducers/posts.reducers";

const App = () => {
	const [currentId, setCurrentId] = useState(0);
	const [editing, setEditing] = useState(false);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth="lg">
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography className={classes.heading} variant="h2" align="center">
					Social App
				</Typography>
				<img className={classes.image} src={memories} alt="icon" height="60" />
			</AppBar>
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
		</Container>
	);
};

export default App;
